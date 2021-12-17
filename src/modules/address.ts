import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Address = {
    /**
     * Update (or create) address
     */
    update: async ({name=null, description=null, links=null, meta=null, preview=null, category=null}, tx={}) => {
        return Instruction.wrap({
            function: 'address.update',
            name: name,
            description: description,
            links: links,
            meta: meta,
            preview: preview,
            category: category,
        }, tx)
    },
    /**
     * Read address data for an address (pool, token, balance)
     */
    read: async ({address}) => {
        var result = await $fetch(Config.interface+'/address', {
            method: 'GET',
            params: {address: address, dev: Config.dev},
        }).catch(e => {
            throw Error(e.data)
        })

        return {pool: result.pool, balance: result.balance, token: result.token}
    },
}