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
    create: async (tx) => {
        tx = Utils.strip(tx)
        Models.requiredFields(tx, ['to', 'amount'])
        Models.exclusiveFields(tx, ['sender', 'token', 'from', 'to', 'amount', 'nonce', 'message', 'function', 'delegate'])
        Models.validFormats(tx, Models.TRANSACTION)
        
        tx = {...Transaction.template(), ...tx}

        if (tx.to == tx.from && tx.function != 'transaction.sponsor') throw Error('to and from cannot be equal')
        if (tx.function && tx.function != tx.function.toLowerCase()) throw Error('invalid function')

        if (!Config.privateKey) return tx
        tx.signature = await Wallet.sign(await Hashing.transaction(tx), Config.privateKey)

        var r = await $fetch.raw(Config.network+'/transaction', {
            method: 'POST',
            body: tx})
        .catch(e => {
            throw Error(e.data)
        })

        if (r.data.error) throw Error(r.data.error)
        return r.data
    },
    /**
     * Batch create FTs
     * Only possible for simple transfers to non-pools
     */
    batchFt: async (txns, tx) => {
        Models.requiredFields(tx, ['amount', 'token'])
        Models.validFormats(tx, Models.TRANSACTION)

        txns.forEach(t => {
            Models.requiredFields(t, ['to', 'amount'])
            Models.exclusiveFields(t, ['to', 'amount'])
            Models.validFormats(t, Models.TRANSACTION)
        })
        
        if (txns.length != Utils.unique(txns).length) throw Error('validation: contains duplicate recipients')
        if (txns.some(t => t.amount.lte(0))) throw Error('validation: amounts must be positive')
        if (!tx.amount.eq(txns.reduce((a, t) => a.add(t.amount), Constants.zero))) throw Error('validation: inconsistent amounts')

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            function: 'transaction.batch',
            message: JSON.stringify(txns),
        }})

        result.data = await Promise.all(result.data.map(r => Models.parseValues(r, Models.TRANSACTION)))
        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Batch create NFTs
     */
    batchNft: async (txns) => {
        var tx = Transaction.template()

        await Promise.all(txns.map(async (t) => {
            Models.requiredFields(t, ['to', 'token'])
            Models.exclusiveFields(t, ['to', 'token'])
            Models.validFormats(t, Models.TRANSACTION)
            t.signature = await Wallet.sign(await Hashing.transaction({...{sender: tx.sender, from: tx.from, amount: 1, nonce: tx.nonce}, ...t}), Config.privateKey)
        }))

        var result = await Transaction.create({...Transaction.template(), ...{
            function: 'transaction.batch',
            message: JSON.stringify(txns),
        }})

        result.data = await Promise.all(result.data.map(r => Models.parseValues(r, Models.TRANSACTION)))
        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Sponsor xeta for delegated transfers
     */
    sponsor: async (tx) => {
        Models.requiredFields(tx, ['to', 'amount'])
        Models.exclusiveFields(tx, ['from', 'to', 'amount', 'nonce'])
        Models.validFormats(tx, Models.TRANSACTION)

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            to: tx.to,
            amount: tx.amount,
            function: 'transaction.sponsor',
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Get transaction by signature
     */
    get: async (signature: string) => {
        var r = await $fetch.raw(Config.interface+'/transaction', {
            method: 'GET',
            params: {signature: signature},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.TRANSACTION)
    },
    /**
     * Batch get transactions by signature
     */
    batchGet: async (signatures: string[]) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {signatures: signatures.join(',')},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Poll periodically, to receive confirmation response
     */
    poll: async (signature: string, interval: number = 0.5, timeout: number = 5) => {
        var start = Date.now()

        while (Date.now() < start+timeout*1000) {
            var r = await $fetch.raw(Config.interface+'/transaction', {
                method: 'GET',
                params: {signature: signature},
            }).catch(e => {
                throw Error(e.data)
            })

            if (r.data) return Models.parseValues(r.data, Models.TRANSACTION)
            else await Utils.sleep(interval*1000)
        }
    },
    /**
     * Scan transactions by from
     */
    scanByFrom: async (from: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {from: from, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by to
     */
    scanByTo: async (to: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {to: to, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by sender
     */
    scanBySender: async (sender: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {sender: sender, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by token
     */
    scanByToken: async (token: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {token: token, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by period
     */
    scanByPeriod: async (period: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {period: period, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by from and token
     */
    scanByFromToken: async (from: string, token: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {from: from, token: token, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
    /**
     * Scan transactions by to and token
     */
    scanByToToken: async (to: string, token: string, signature?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/transactions', {
            method: 'GET',
            params: {to: to, token: token, signature: signature, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TRANSACTION))
    },
}