import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hashed } from '../library/hashed'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Credential = {
    /**
     * Read or create credentials
     */
    init: async({seed, password, unsafe=null, create=null}) => {
        return $fetch(Config.interface+'/credentials', {
            method: 'POST',
            body: Utils.strip({
                seed: seed,
                password: await Hashed.string(password),
                unsafe: unsafe,
                create: create,
            }),
        }).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * Sign transaction with managed credentials
     * Returns transaction with signature
     */
    sign: async ({seed, password, tx}) => {
        Models.validFormats(tx, Models.TRANSACTION)

        return $fetch(Config.interface+'/sign', {
            method: 'POST',
            body: {
                seed: seed,
                password: await Hashed.string(password),
                transaction: JSON.stringify(tx),
            },
        }).catch(e => {
            throw Error(e.data)
        })
    }
}
