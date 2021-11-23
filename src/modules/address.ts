import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Address = {
    /**
     * Get address data (account & balance)
     */
    get: async ({address}) => {
        var result = await $fetch(Config.interface+'/address', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return {
            pool: Models.parseValues(result.pool, Models.POOL),
            balance: Models.parseValues(result.balance, Models.BALANCE),
            account: Models.parseValues(result.account, Models.TOKEN)}
    },
    /**
     * Update address values
     */
    update: async ({name=null, object=null, description=null, links=null, meta=null}, tx={}) => {
        var result = await Transaction.create({...tx, ...{
            function: 'address.update',
            message: JSON.stringify(Utils.strip({
                name: name,
                object: object,
                description: description,
                links: links,
                meta: meta,
            })),
        }})

        result.data = Models.parseValues(result.data, Models.TOKEN)
        return result
    },
}