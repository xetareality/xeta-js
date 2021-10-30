import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Audit = {
    /**
     * Request a token balance audit
     */
    balance: async ({address, token, limit=1}) => {
        return $fetch(Config.interface+'/audit', {
            method: 'GET',
            params: {address: address, token: token, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * Request a xeta balanace audit
     */
    xeta: async ({address, limit=1}) => {
        return $fetch(Config.interface+'/audit', {
            method: 'GET',
            params: {address: address, token: Config.xetaAddress, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * Request a transaction audit
     */
    transaction: async ({signature}) => {
        return $fetch(Config.interface+'/audit', {
            method: 'GET',
            params: {signature: signature},
        }).catch(e => {
            throw Error(e.data)
        })
    }
}