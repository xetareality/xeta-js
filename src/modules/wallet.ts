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
     */
    init: ({publicKey, privateKey=null}) => {
        Config.publicKey = publicKey
        Config.privateKey = privateKey
    },
    /**
     * Connect to managed wallet
     */
    managed: async ({account, secret, unsafe=null, create=null}) => {
        var wallet = await $fetch(Config.interface+'/wallet', {
            method: 'POST',
            body: Utils.strip({
                account: account,
                secret: secret,
                unsafe: unsafe,
                create: create,
            }),
        }).catch(e => {
            throw Error(e.data)
        })

        Wallet.init({publicKey: wallet.publicKey, privateKey: wallet.privateKey})
        return wallet
    },
    /**
     * Sign transaction with managed wallet
     * Returns transaction with signature
     */
    sign: async ({account, secret, tx}) => {
        Models.validFormats(tx, Models.TRANSACTION)

        return $fetch(Config.interface+'/sign', {
            method: 'POST',
            body: {
                account: account,
                secret: await Hashed.string(secret),
                transaction: JSON.stringify(tx),
            },
        }).catch(e => {
            throw Error(e.data)
        })
    }
}
