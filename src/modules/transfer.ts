import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hashed } from '../library/hashed'

export const Transfer = {
    /**
     * Create transfer
     */
    create: async ({to, token, amount=null, from=null, message=null}, tx={}) => {
        return Instruction.wrap({
            function: 'transfer.create',
            to: to,
            token: token,
            amount: Utils.amount(amount),
            from: from,
            message: message,
        }, tx)
    },
    /**
     * Read transfer by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'transfer',
            key: hash,
        }, ...args})
    },
    /**
     * List transfers by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'transfer',
            keys: hashes,
        }, ...args})
    },
    /**
     * Scan transfers by sender, sort by created
     */
    scanSenderCreated: async ({sender, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'sender',
            indexValue: sender,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transfers by from, sort by created
     */
    scanFromCreated: async ({from, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'from',
            indexValue: from,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transfers by to, sort by created
     */
    scanToCreated: async ({to, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'to',
            indexValue: to,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transfers by token, sort by created
     */
    scanTokenCreated: async ({token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'token',
            indexValue: token,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transfers by fromToken, sort by created
     */
    scanFromTokenCreated: async ({from, token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'fromToken',
            indexValue: (await Hashed.values([from, token])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transfers by toToken, sort by created
     */
    scanToTokenCreated: async ({to, token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transfer',
            index: 'toToken',
            indexValue: (await Hashed.values([to, token])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
}