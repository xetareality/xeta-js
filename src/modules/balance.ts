import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Balance = {
    /**
     * Get balance by address and token
     */
    get: async ({address, token, extended=null}) => {
        return Models.parseValues(await $fetch(Config.interface+'/balance', {
            method: 'GET',
            params: Utils.strip({address: address, token: token, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        }), Models.BALANCE)
    },
    /**
     * Scan balances by address
     */
    scanByAddress: async ({address, token=null, amount=null, sort='DESC', limit=25, extended=null}) => {
        return (await $fetch(Config.interface+'/balances', {
            method: 'GET',
            params: Utils.strip({address: address, token: token, amount: amount, sort: sort, limit: limit, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.BALANCE))
    },
    /**
     * Scan balances by address
     */
    scanByToken: async ({token, address=null, amount=null, sort='DESC', limit=25, extended=null}) => {
        return (await $fetch(Config.interface+'/balances', {
            method: 'GET',
            params: Utils.strip({token: token, address: address, amount: amount, sort: sort, limit: limit, extended: extended}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.BALANCE))
    },
}