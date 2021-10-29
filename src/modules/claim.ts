import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Claim = {
    /**
     * Get claim by address, token and owner
     */
    get: async ({address, token, owner}) => {
        return Models.parseValues(await $fetch(Config.interface+'/claim', {
            method: 'GET',
            params: {address: address, token: token, owner: owner},
        }).catch(e => {
            throw Error(e.data)
        }), Models.CLAIM)
    },
    /**
     * Get claim by hash
     */
    getByHash: async ({hash}) => {
        return Models.parseValues(await $fetch(Config.interface+'/claim', {
            method: 'GET',
            params: {hash: hash},
        }).catch(e => {
            throw Error(e.data)
        }), Models.CLAIM)
    },
    /**
     * Scan claims by amount
     */
    scanByAmount: async ({owner, hash=null, amount=1, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/claims', {
            method: 'GET',
            params: Utils.strip({owner: owner, hash: hash, amount: amount, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.CLAIM))
    },
    /**
     * Scan claims by created
     */
    scanByCreated: async ({owner, hash=null, created=1, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/claims', {
            method: 'GET',
            params: Utils.strip({owner: owner, hash: hash, created: created, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.CLAIM))
    },
}