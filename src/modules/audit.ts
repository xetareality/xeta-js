import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Audit = {
    /**
     * Request an token balance audit
     */
    balance: async (address: string, token: string, limit: number = 1) => {
        var r = await $fetch.raw(Config.interface+'/audit', {
            method: 'GET',
            params: {address: address, token: token, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data
    },
    /**
     * Request a xeta balanace audit
     */
    xeta: async (address: string, limit: number = 1) => {
        var r = await $fetch.raw(Config.interface+'/audit', {
            method: 'GET',
            params: {address: address, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data
    },
    /**
     * Request a transaction audit
     */
    transaction: async (signature: string) => {
        var r = await $fetch.raw(Config.interface+'/audit', {
            method: 'GET',
            params: {signature: signature},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data
    }
}