import { Model } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Claim = {
    /**
     * Get claim by address, token and owner
     */
    get: async (address: string, token: string, owner: string) => {
        var r = await $fetch.raw(Config.interface+'/claim', {
            method: 'GET',
            params: {address: address, token: token, owner: owner},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.CLAIM)
    },
    /**
     * Get claim by hash
     */
    getByHash: async (hash: string) => {
        var r = await $fetch.raw(Config.interface+'/claim', {
            method: 'GET',
            params: {hash: hash},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.CLAIM)
    },
    /**
     * Scan claims by amount
     */
    scanByAmount: async (owner: string, hash?: string, amount: number = 1, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/claims', {
            method: 'GET',
            params: {owner: owner, hash: hash, amount: amount, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.CLAIM))
    },
    /**
     * Scan claims by created
     */
    scanByCreated: async (owner: string, hash?: string, created: number = 1, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/claims', {
            method: 'GET',
            params: {owner: owner, hash: hash, created: created, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.CLAIM))
    },
}