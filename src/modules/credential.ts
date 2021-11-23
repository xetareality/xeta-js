import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Hashed } from '../library/hashed'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Credentials = {
    /**
     * Read or create credentials
     */
    init: async({seed, password, unsafe=null, create=null}) => {
        return Models.parseValues(await $fetch(Config.interface+'/credentials', {
            method: 'POST',
            body: Utils.strip({seed: seed, password: await Hashed.string(password), unsafe: unsafe, create: create}),
        }).catch(e => {
            throw Error(e.data)
        }), Models.CREDENTIALS)
    },
    /**
     * Sign transaction with managed credentials
     * Return transaction with signature
     */
    sign: async ({seed, password}, tx) => {
        Models.validFormats(tx, Models.TRANSACTION)

        return Models.parseValues(await $fetch(Config.interface+'/sign', {
            method: 'POST',
            body: {seed: seed, password: await Hashed.string(password), transaction: JSON.stringify(tx)},
        }).catch(e => {
            throw Error(e.data)
        }), Models.TRANSACTION)
    }
}
