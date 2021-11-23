import { Instruction } from './instruction'
import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hashed } from '../library/hashed'

export const Allowance = {
    /**
     * Update allowance for spender address
     */
    update: async ({spender, token, amount}, tx={}) => {
        return Instruction.wrap({
            function: 'allowance.update',
            spender: spender,
            token: token,
            amount: Utils.amount(amount),
        }, tx)
    },
    /**
     * Read allowance by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'allowance',
            key: hash,
        }, ...args})
    },
    /**
     * List allowances by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'allowance',
            keys: hashes,
        }, ...args})
    },
    /**
     * Read allowance by address, token and spender
     */
    readAddressTokenSpender: async ({address, token, spender}, args={}) => {
        return Resource.read({...{
            type: 'allowance',
            key: await Hashed.allowance({address: address, token: token, spender: spender}),
        }, ...args})
    },
    /**
     * Scan allowances by address, sort by created
     */
    scanByAddress: async ({address, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'allowance',
            index: 'address',
            indexValue: address,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan allowances by spender, sort by created
     */
    scanBySpender: async ({spender, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'allowance',
            index: 'spender',
            indexValue: spender,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
}