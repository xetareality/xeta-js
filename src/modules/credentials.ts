import { Model } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'
import { Hashing } from '../library/hashing'

export const Credentials = {
    /**
     * Get address data (account & balance)
     */
    get: async (seed: string, password: string, unsafe: boolean = false) => {
        var credentials = {seed: seed, password: await Hashing.string(password)}
        Models.validFormats(credentials, Models.CREDENTIALS)

        var r = await $fetch.raw(Config.interface+'/credentials', {
            method: 'GET',
            params: {...credentials, ...(unsafe ? {unsafe: 1} : {})},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.CREDENTIALS)
    },
    /**
     * Create credentials
     */
    create: async(seed: string, password: string) => {
        var credentials = {seed: seed, password: await Hashing.string(password)}
        Models.validFormats(credentials, Models.CREDENTIALS)

        var r = await $fetch.raw(Config.interface+'/credentials', {
            method: 'POST',
            body: credentials,
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.CREDENTIALS)
    },
    /**
     * Sign transaction with managed credentials
     * Return transaction with signature
     */
    sign: async (tx, seed: string, password: string) => {
        var credentials = {seed: seed, password: await Hashing.string(password)}
        Models.requiredFields(credentials, ['seed', 'password'])
        Models.exclusiveFields(credentials, ['seed', 'password'])
        Models.validFormats(credentials, Models.CREDENTIALS)
        Models.validFormats(tx, Models.TRANSACTION)

        var r = await $fetch.raw(Config.interface+'/sign', {
            method: 'POST',
            body: {...credentials, ...{transaction: JSON.stringify(tx)}},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.TRANSACTION)
    }
}
