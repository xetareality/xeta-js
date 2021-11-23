import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Allowance = {
    /**
     * Create allowance for spender address
     */
    create: async ({token, spender, amount}, tx={}) => {
        var result = await Transaction.create({...tx, ...{
            token: token,
            function: 'allowance.create',
            message: JSON.stringify({spender: spender, amount: amount}),
        }})

        result.data = Models.parseValues(result.data, Models.ALLOWANCE)
        return result
    },
    /**
     * Batch create allowances
     */
    batch: async ({token, allowances}, tx={}) => {
        if (allowances.length > 20) throw Error('input: batch exceeds maximum items')

        allowances.forEach(a => {
            Models.requiredFields(a, ['spender', 'amount'])
            Models.exclusiveFields(a, ['spender', 'amount'])
            Models.validFormats(a, Models.ALLOWANCE)
        })

        var result = await Transaction.create({...tx, ...{
            token: token,
            function: 'allowance.batch',
            message: JSON.stringify(allowances),
        }})

        result.data = result.data.map(d => Models.parseValues(d, Models.ALLOWANCE))
        return result
    },
    /**
     * Get allowance by address, token and spender
     */
    get: async ({address, token, spender, extended=null}) => {
        return Models.parseValues(await $fetch(Config.interface+'/allowance', {
            method: 'GET',
            params: Utils.strip({address: address, token: token, spender: spender, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        }), Models.ALLOWANCE)
    },
    /**
     * Get allowance by hash
     */
    getByHash: async ({hash, extended=null}) => {
        return Models.parseValues(await $fetch(Config.interface+'/allowance', {
            method: 'GET',
            params: Utils.strip({hash: hash, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        }), Models.ALLOWANCE)
    },
    /**
     * Scan allowances by address
     */
    scanByAddress: async ({address, hash=null, created=null, sort='DESC', limit=25, extended=null}) => {
        return (await $fetch(Config.interface+'/allowances', {
            method: 'GET',
            params: Utils.strip({address: address, hash: hash, created: created, sort: sort, limit: limit, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.ALLOWANCE))
    },
    /**
     * Scan allowances by spender
     */
    scanBySpender: async ({spender, hash=null, created=null, sort='DESC', limit=25, extended=null}) => {
        return (await $fetch(Config.interface+'/allowances', {
            method: 'GET',
            params: Utils.strip({spender: spender, hash: hash, created: created, sort: sort, limit: limit, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.ALLOWANCE))
    },
}