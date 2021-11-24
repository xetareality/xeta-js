import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Models } from '../library/models'
import { Hashed } from '../library/hashed'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Wallet = {
    /**
     * Set public and private key
     * Optionally set network and interface endpoints
     */
    connect: ({publicKey, privateKey=null, networkEndpoint=null, interfaceEndpoint=null, seed=null, password=null}) => {
        Config.publicKey = publicKey
        Config.privateKey = privateKey
        if (networkEndpoint) Config.network = networkEndpoint
        if (interfaceEndpoint) Config.interface = interfaceEndpoint
        if (seed) Config.seed = seed
        if (password) Config.password = password
    },
    /**
     * Read or create wallet
     */
    init: async({seed, password, unsafe=null, create=null}) => {
        return $fetch(Config.interface+'/wallet', {
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
     * Sign transaction with managed wallet
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
