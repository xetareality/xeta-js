import { $fetch } from 'ohmyfetch'
import { Config, Constants } from '../library/config'
import { Utils } from '../library/utils'
import { Models } from '../library/models'
import { Wallet } from '../library/wallet'
import { Hashing } from '../library/hashing'

export const Transaction = {
    /**
     * Template transaction
     */
    template: () => ({
        sender: Config.publicKey,
        from: Config.publicKey,
        to: Config.factoryAddress,
        token: Config.xetaAddress,
        nonce: Date.now(),
        amount: Constants.zero,
    }),
    /**
     * Create transaction
     */
    create: async (tx: any = {}) => {
        tx = Utils.strip({...Transaction.template(), ...tx})
        Models.requiredFields(tx, ['to', 'amount'])
        Models.exclusiveFields(tx, ['sender', 'token', 'from', 'to', 'amount', 'nonce', 'message', 'function', 'delegate', 'signature'])
        Models.validFormats(tx, Models.TRANSACTION)

        if (tx.to == tx.from && tx.function != 'transaction.sponsor') throw Error('to and from cannot be equal')
        if (tx.function && tx.function != tx.function.toLowerCase()) throw Error('invalid function')

        if (!tx.signature && !Config.privateKey) return tx
        if (!tx.signature) tx.signature = await Wallet.sign(await Hashing.transaction(tx), Config.privateKey)

        var result = await $fetch(Config.network+'/transaction', {
            method: 'POST',
            body: tx})
        .catch(e => {
            throw Error(e.data)
        })

        if (result.error) throw Error(result.error)
        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Batch create FTs
     * Only possible for simple transfers to non-pools
     */
    batchFt: async ({token, transactions}, tx={}) => {
        transactions.forEach(t => {
            Models.requiredFields(t, ['to', 'amount'])
            Models.exclusiveFields(t, ['to', 'amount'])
            Models.validFormats(t, Models.TRANSACTION)
        })
        
        if (transactions.length != Utils.unique(transactions).length) throw Error('validation: contains duplicate recipients')
        if (transactions.some(t => t.amount.lte(0))) throw Error('validation: amounts must be positive')

        var result = await Transaction.create({...tx, ...{
            token: token,
            amount: transactions.reduce((a, t) => a.add(t.amount), Constants.zero),
            function: 'transaction.batch',
            message: JSON.stringify(transactions),
        }})

        result.data = result.data.map(r => Models.parseValues(r, Models.TRANSACTION))
        return result
    },
    /**
     * Batch create NFTs
     */
    batchNft: async ({transactions}, tx={}) => {
        tx = {...Transaction.template(), ...tx}

        await Promise.all(transactions.map(async (t) => {
            Models.requiredFields(t, ['to', 'token'])
            Models.exclusiveFields(t, ['to', 'token'])
            Models.validFormats(t, Models.TRANSACTION)
            t.signature = await Wallet.sign(await Hashing.transaction({...{sender: tx.sender, from: tx.from, amount: 1, nonce: tx.nonce}, ...t}), Config.privateKey)
        }))

        var result = await Transaction.create({...tx, ...{
            function: 'transaction.batch',
            message: JSON.stringify(transactions),
        }})

        result.data = result.data.map(r => Models.parseValues(r, Models.TRANSACTION))
        return result
    },
    /**
     * Sponsor xeta for delegated transfers
     */
    sponsor: async ({to, amount}, tx={}) => {
        return Transaction.create({...tx, ...{
            to: to,
            amount: amount,
            function: 'transaction.sponsor',
        }})
    },
    /**
     * Get transaction by signature
     */
    get: async ({signature}) => {
        return Models.parseValues(await $fetch(Config.interface+'/transaction', {
            method: 'GET',
            params: {signature: signature},
        }).catch(e => {
            throw Error(e.data)
        }), Models.TRANSACTION)
    },
    /**
     * Batch get transactions by signature
     */
    batchGet: async ({signatures}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: {signatures: signatures.join(',')},
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Poll periodically, to receive confirmation response
     */
    poll: async ({signature, interval=0.5, timeout=5}) => {
        var start = Date.now()
        while (Date.now() < start+timeout*1000) {
            var result = await $fetch(Config.interface+'/transaction', {
                method: 'GET',
                params: {signature: signature},
            }).catch(e => {
                throw Error(e.data)
            })

            if (result) return Models.parseValues(result, Models.TRANSACTION)
            else await Utils.sleep(interval*1000)
        }
    },
    /**
     * Scan transactions by from
     */
    scanByFrom: async ({from, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({from: from, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by to
     */
    scanByTo: async ({to, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({to: to, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by sender
     */
    scanBySender: async ({sender, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({sender: sender, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by token
     */
    scanByToken: async ({token, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({token: token, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by period
     */
    scanByPeriod: async ({period, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({period: period, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by from and token
     */
    scanByFromToken: async ({from, token, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({from: from, token: token, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by to and token
     */
    scanByToToken: async ({to, token, signature=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/transactions', {
            method: 'GET',
            params: Utils.strip({to: to, token: token, signature: signature, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.TRANSACTION))
    },
}