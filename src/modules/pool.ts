import { Model } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Pool = {
    /**
     * Create pool
     */
    create: async (pool, tx) => {
        Models.requiredFields(tx, ['token'])
        Models.requiredFields(pool, ['program'])
        Models.exclusiveFields(pool, ['program', 'name', 'mechanism', 'candidates', 'rate', 'percentage', 'probability', 'expires', 'answers', 'minAmount', 'maxAmount', 'minTime', 'maxTime', 'transfersLimit', 'claimsLimit', 'tokenLimit', 'xetaLimit', 'tokenTarget', 'xetaTarget'])
        Models.validFormats(pool, Models.POOL)

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            token: tx.token,
            function: 'pool.create',
            message: JSON.stringify(pool),
        }})

        result.data = {
            auction: Auction,
            launch: Launch,
            lock: Lock,
            loot: Loot,
            lottery: Lottery,
            royalty: Royalty,
            staking: Staking,
            swap: Swap,
            vote: Vote,
        }[result.data.program](Models.parseValues(result.data, Models.POOL))

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Get pool by address
     * Return as program instance
     */
    get: async (address: string) => {
        var r = await $fetch.raw(Config.interface+'/pool', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.POOL)
    },
    /**
     * Scan pools by token
     */
    scanByToken: async (token: string, address?: string, program?: string, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/pools', {
            method: 'GET',
            params: {token: token, address: address, program: program, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.POOL))
    },
    /**
     * Scan pools by creator
     */
    scanByCreator: async (creator: string, address?: string, program?: string, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/pools', {
            method: 'GET',
            params: {creator: creator, address: address, program: program, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.POOL))
    },
    /**
     * Scan pools by name
     */
    scanByName: async (name: string, address?: string, program?: string, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/pools', {
            method: 'GET',
            params: {name: name, address: address, program: program, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.POOL))
    },
}