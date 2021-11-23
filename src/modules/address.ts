import { Instruction } from './instruction'
import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Address = {
    /**
     * Update (or create) account
     */
    update: async ({name, object=null, description=null, links=null, meta=null}, tx={}) => {
        return Instruction.wrap({
            function: 'account.update',
            name: name,
            object: object,
            description: description,
            links: links,
            meta: meta,
        }, tx)
    },
    /**
     * Read account data for an address (pool, token, balance)
     */
    read: async ({address}) => {
        var result = await $fetch(Config.interface+'/address', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return {pool: result.pool, balance: result.balance, token: result.token}
    },
}