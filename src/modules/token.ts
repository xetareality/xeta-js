import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Token = {
    /**
     * Create token
     */
    create: async ({name, supply=null, ticker=null, reserve=null, description=null, links=null, object=null, meta=null, icon=null, mime=null}, tx={}) => {
        if (parseInt(supply) == 0) throw Error('validation: supply cannot be 0')
        if (supply && parseInt(supply) != 1 && !ticker) throw Error('validation: fungible tokens require a ticker')

        return Transaction.create({...tx, ...{
            function: 'token.create',
            message: JSON.stringify(Utils.strip({
                name: name,
                supply: supply,
                ticker: ticker,
                reserve: reserve,
                description: description,
                links: links,
                object: object,
                meta: meta,
                icon: icon,
                mime: mime,
            })),
        }})
    },
    /**
     * Update specified values of an token
     */
    update: async ({token, description=null, links=null, meta=null, icon=null}, tx={}) => {
        return Transaction.create({...tx, ...{
            token: token,
            function: 'token.update',
            message: JSON.stringify(Utils.strip({
                description: description,
                links: links,
                meta: meta,
                icon: icon,
            })),
        }})
    },
    /**
     * Mint from reserve
     */
    mint: async ({token, amount}, tx={}) => {
        return Transaction.create({...tx, ...{
            token: token,
            function: 'token.mint',
            message: JSON.stringify({amount: amount}),
        }})
    },
    /**
     * Transfer from token
     */
    transfer: async({from, token, amount}, tx={}) => {
        return Transaction.create({...tx, ...{
            from: from,
            token: token,
            amount: amount,
            function: 'token.transfer',
        }})
    },
    /**
     * Batch create NFTs
     * Fungible tokens cannot be created in batch due to swap pool creation
     */
    batch: async ({tokens}, tx={}) => {
        if (tokens.length > 8) throw Error('input: batch exceeds maximum items')
        if (tokens.some(t => ![undefined, 1].includes(t.supply))) throw Error('validation: function only supports non-fungible tokens')

        tokens.forEach(t => {
            Models.requiredFields(t, ['name'])
            Models.exclusiveFields(t, ['name', 'supply', 'ticker', 'description', 'links', 'object', 'meta', 'icon', 'mime'])
            Models.validFormats(t, Models.TOKEN)
        })

        return Transaction.create({...tx, ...{
            function: 'token.batch',
            message: JSON.stringify(tokens),
        }})
    },
    /**
     * Get token by address
     */
    get: async ({address}) => {
        return Models.parseValues(await $fetch(Config.interface+'/token', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        }), Models.TOKEN)
    },
    /**
     * Batch get tokens by addresses
     */
    batchGet: async ({addresses}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: {addresses: addresses.join(',')},
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by creator
     */
    scanByCreator: async ({creator, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({creator: creator, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by ticker
     */
    scanByTicker: async ({ticker, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({ticker: ticker, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by name
     */
    scanByName: async ({name, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({name: name, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by owner
     */
    scanByOwner: async ({owner, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({owner: owner, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by owner and category
     */
    scanByOwnerCategory: async ({owner, category=null, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({owner: owner, category: category, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by creator and category
     */
    scanByCreatorCategory: async ({creator, category=null, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({creator: creator, category: category, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by hash
     */
    scanByHash: async ({hash, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({hash: hash, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by fingerprint
     */
    scanByFingerprint: async ({fingerprint, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({fingerprint: fingerprint, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by cluster
     */
    scanByHash: async ({cluster, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({cluster: cluster, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by claim
     */
    scanByClaim: async ({creator, owner, token, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({creator: creator, owner: owner, token: token, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by holder
     */
    scanByHolder: async ({holder, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({holder: holder, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by issuer
     */
    scanByIssuer: async ({issuer, address=null, created=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({issuer: issuer, address: address, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by issuer sorted by amount
     */
    scanByIssuerAmount: async ({issuer, address=null, amount=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({issuer: issuer, address: address, amount: amount, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by issuer sorted by random
     */
    scanByIssuerRandom: async ({issuer, address=null, random=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({issuer: issuer, address: address, random: random, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by issuer and answer
     */
    scanByIssuerAnswer: async ({issuer, address=null, answer=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({issuer: issuer, address: address, answer: answer, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
    /**
     * Scan tokens by issuer and number
     */
    scanByIssuerNumber: async ({issuer, address=null, number=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/tokens', {
            method: 'GET',
            params: Utils.strip({issuer: issuer, address: address, number: number, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(t => Models.parseValues(t, Models.TOKEN))
    },
}