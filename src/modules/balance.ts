import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hashed } from '../library/hashed'

export const Balance = {
    /**
     * Read balance by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'balance',
            key: hash,
        }, ...args})
    },
    /**
     * Read balance by address and token
     */
    readAddressToken: async ({address, token}, args={}) => {
        return Resource.read({...{
            type: 'balance',
            key: await Hashed.balance({address: address, token: token}),
        }, ...args})
    },
    /**
     * List balances by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'balance',
            keys: hashes,
        }, ...args})
    },
    /**
     * Scan balances by address, sort by amount
     */
    scanAddressAmount: async ({address, amount=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'balance',
            index: 'address',
            indexValue: address,
            sort: 'amount',
            sortValue: amount,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan balances by token, sort by amount
     */
    scanTokenAmount: async ({token, amount=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'balance',
            index: 'token',
            indexValue: token,
            sort: 'amount',
            sortValue: amount,
            keyValue: hash,
        }, ...args})
    },
}