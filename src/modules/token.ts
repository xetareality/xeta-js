import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Token = {
    /**
     * Create token
     */
    create: async (token, tx={}) => {
        Models.requiredFields(token, ['name'])
        Models.exclusiveFields(token, ['name', 'supply', 'ticker', 'reserve', 'description', 'links', 'object', 'meta', 'icon', 'mime'])
        Models.validFormats(token, Models.TOKEN)
        Models.validFormats(tx, Models.TRANSACTION)

        if (token.supply && token.supply.lte(0)) throw Error('validation: supply cannot be 0')
        if (token.supply && !token.supply.eq(1) && !token.ticker) throw Error('validation: fungible tokens require a ticker')

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            function: 'token.create',
            message: JSON.stringify(token),
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Update specified values of an token
     */
    update: async (token, tx) => {
        Models.exclusiveFields(token, ['description', 'links', 'meta', 'icon'])
        Models.validFormats(token, Models.TOKEN)
        Models.requiredFields(tx, ['token'])
        Models.validFormats(tx, Models.TRANSACTION)

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            function: 'token.update',
            message: JSON.stringify(token),
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Mint from reserve
     */
    mint: async (token, tx) => {
        Models.requiredFields(token, ['amount'])
        Models.exclusiveFields(token, ['amount'])
        Models.requiredFields(tx, ['token'])
        Models.validFormats(tx, Models.TRANSACTION)

        var result = await Transaction.create({...Transaction.template(), ...tx, ...{
            function: 'token.mint',
            message: JSON.stringify(token),
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Batch create NFTs
     * Fungible tokens cannot be created in batch due to swap pool creation
     */
    batch: async (tokens) => {
        if (tokens.length > 8) throw Error('input: batch exceeds maximum items')
        if (tokens.some(t => ![undefined, 1].includes(t.supply))) throw Error('validation: function only supports non-fungible tokens')

        tokens.forEach(t => {
            Models.requiredFields(t, ['name'])
            Models.exclusiveFields(t, ['name', 'supply', 'ticker', 'description', 'links', 'object', 'meta', 'icon', 'mime'])
            Models.validFormats(t, Models.TOKEN)
        })

        var result = await Transaction.create({...Transaction.template(), ...{
            function: 'token.batch',
            message: JSON.stringify(tokens),
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
    /**
     * Get token by address
     */
    get: async (address: string) => {
        var r = await $fetch.raw(Config.interface+'/token', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.TOKEN)
    },
    /**
     * Batch get tokens by addresses
     */
    batchGet: async (addresses: string[]) => {
        var r = await $fetch.raw(Config.interface+'/tokens', {
            method: 'GET',
            params: {addresses: addresses.join(',')},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TOKEN))
    },
    /**
     * Scan tokens by creator
     */
    scanByCreator: async (creator: string, address?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/tokens', {
            method: 'GET',
            params: {creator: creator, address: address, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TOKEN))
    },
    /**
     * Scan tokens by ticker
     */
    scanByTicker: async (ticker: string, address?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/tokens', {
            method: 'GET',
            params: {ticker: ticker, address: address, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TOKEN))
    },
    /**
     * Scan tokens by name
     */
    scanByName: async (name: string, address?: string, created?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/tokens', {
            method: 'GET',
            params: {name: name, address: address, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.TOKEN))
    },
}