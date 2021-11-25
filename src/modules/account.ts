import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Account = {
    /**
     * Update (or create) account
     */
    update: async ({name, description=null, links=null, meta=null, icon=null, category=null}, tx={}) => {
        return Instruction.wrap({
            function: 'account.update',
            name: name,
            description: description,
            links: links,
            meta: meta,
            icon: icon,
            category: category,
        }, tx)
    },
    /**
     * Read account data for an address (pool, token, balance)
     */
    read: async ({address}) => {
        var result = await $fetch(Config.interface+'/account', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        return {pool: result.pool, balance: result.balance, token: result.token}
    },
}