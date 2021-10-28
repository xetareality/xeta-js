import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Address = {
    /**
     * Get address data (account & balance)
     */
    get: async (address: string) => {
        var r = await $fetch.raw(Config.interface+'/address', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return {balance: Models.parseValues(r.data.balance, Models.BALANCE), account: Models.parseValues(r.data.balance, Models.TOKEN)}
    },
    /**
     * Update address values
     */
    update: async (values: object) => {
        Models.exclusiveFields(values, ['name', 'object', 'description', 'links', 'meta'])
        Models.validFormats(values, Models.TOKEN)

        var result = await Transaction.create({...Transaction.template(), ...{
            function: 'address.update',
            message: JSON.stringify(values),
        }})

        return Models.parseValues(result, Models.TRANSACTION)
    },
}