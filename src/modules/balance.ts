import { Model } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Balance = {
    /**
     * Get balance by address and token
     */
    get: async (address: string, token: string) => {
        var r = await $fetch.raw(Config.interface+'/balance', {
            method: 'GET',
            params: {address: address, token: token},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.BALANCE)
    },
    /**
     * Scan balances by address
     */
    scanByAddress: async (address: string, token?: string, amount?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/allowances', {
            method: 'GET',
            params: {address: address, token: token, amount: amount, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.BALANCE))
    },
    /**
     * Scan balances by address
     */
    scanByToken: async (token: string, address?: string, amount?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/allowances', {
            method: 'GET',
            params: {token: token, address: address, amount: amount, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.BALANCE))
    },
}