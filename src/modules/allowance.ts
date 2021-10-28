import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Allowance = {
    /**
     * Create allowance for spender address
     */
    create: async (allowance, tx) => {
        Models.requiredFields(tx, ['token'])
        Models.requiredFields(allowance, ['spender', 'amount'])
        Models.exclusiveFields(allowance, ['spender', 'amount'])
        Models.validFormats(allowance, Models.TRANSACTION)

        var result = await Transaction.create({...Transaction.template(), ...{
            token: tx.token,
            function: 'allowance.create',
            message: JSON.stringify(allowance),
        }})

        return Models.parseValues(result, Models.ALLOWANCE)
    },
    /**
     * Batch create allowances
     */
    batch: async (allowances, tx) => {
        if (allowances.length > 20) throw Error('input: batch exceeds maximum items')
        Models.requiredFields(tx, ['token'])
        Models.validFormats(tx, Models.TRANSACTION)

        allowances.forEach(a => {
            Models.requiredFields(a, ['spender', 'amount'])
            Models.exclusiveFields(a, ['spender', 'amount'])
            Models.validFormats(a, Models.ALLOWANCE)
        })

        var result = await Transaction.create({...Transaction.template(), ...{
            token: tx.token,
            function: 'allowance.batch',
            message: JSON.stringify(allowances),
        }})

        return result.data.map(d => Models.parseValues(d, Models.ALLOWANCE))
    },
    /**
     * Get allowance by address, token and spender
     */
    get: async (address: string, token: string, spender: string) => {
        var r = await $fetch.raw(Config.interface+'/allowance', {
            method: 'GET',
            params: {address: address, token: token, spender: spender},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.ALLOWANCE)
    },
    /**
     * Get allowance by hash
     */
    getByHash: async (hash: string) => {
        var r = await $fetch.raw(Config.interface+'/allowance', {
            method: 'GET',
            params: {hash: hash},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.ALLOWANCE)
    },
    /**
     * Scan allowances by address
     */
    scanByAddress: async (address: string, hash?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/allowances', {
            method: 'GET',
            params: {address: address, hash: hash, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.ALLOWANCE))
    },
    /**
     * Scan allowances by spender
     */
    scanBySpender: async (spender: string, hash?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/allowances', {
            method: 'GET',
            params: {spender: spender, hash: hash, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.ALLOWANCE))
    },
}