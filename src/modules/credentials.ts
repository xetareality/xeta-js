import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Hashing } from '../library/hashing'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Credentials = {
    /**
     * Get address data (account & balance)
     */
    get: async ({seed, password, unsafe=null}) => {
        return Models.parseValues(await $fetch(Config.interface+'/credentials', {
            method: 'GET',
            params: Utils.strip({seed: seed, password: await Hashing.string(password), unsafe: unsafe}),
        }).catch(e => {
            throw Error(e.data)
        }), Models.CREDENTIALS)
    },
    /**
     * Create credentials
     */
    create: async({seed, password}) => {
        return Models.parseValues(await $fetch(Config.interface+'/credentials', {
            method: 'POST',
            body: {seed: seed, password: await Hashing.string(password)},
        }).catch(e => {
            throw Error(e.data)
        }), Models.CREDENTIALS)
    },
    /**
     * Sign transaction with managed credentials
     * Return transaction with signature
     */
    sign: async ({seed, password}, tx={}) => {
        Models.validFormats(tx, Models.TRANSACTION)

        return Models.parseValues(await $fetch(Config.interface+'/sign', {
            method: 'POST',
            body: {seed: seed, password: await Hashing.string(password), transaction: JSON.stringify(tx)},
        }).catch(e => {
            throw Error(e.data)
        }), Models.TRANSACTION)
    }
}
