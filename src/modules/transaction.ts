import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Models } from '../library/models'
import { Crypto } from '../library/crypto'
import { Hashed } from '../library/hashed'
import { Resource } from './resource'
import { $fetch } from 'ohmyfetch'

export const Transaction = {
    /**
     * Create transaction
     */
    submit: async (instructions, tx: any = {}) => {
        instructions = await Promise.all(instructions)

        tx = Utils.strip({...{
            instructions: instructions,
            sender: Config.publicKey,
            nonce: Math.round(Date.now()/1000),
        }, ...tx})
        
        Models.exclusiveFields(tx, ['hash', 'signature', 'sender', 'instructions', 'nonce', 'sponsored'])
        Models.validFormats(tx, Models.TRANSACTION)

        if (!tx.signature && !Config.privateKey) return tx
        if (!tx.signature) tx.signature = await Crypto.sign(await Hashed.transaction(tx), Config.privateKey)

        var result = await $fetch(Config.network+(Config.dev ? '?dev=1' : ''), {
            method: 'POST',
            body: tx})
        .catch(e => {
            throw Error(e.data)
        })

        if (result.error) throw Error(result.error)
        return result
    },
    /**
     * Poll a transactionPoll a transaction
     */
    poll: async ({hash, interval=0.5, timeout=5}) => {
        var start = Date.now()
        while (Date.now() < start+timeout) {
            var result = await Transaction.read({hash: hash})
            if (result) return result
            else await Utils.sleep(interval)
        }
    },
    /**
     * Read transaction by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'transaction',
            key: hash,
        }, ...args})
    },
    /**
     * List transactions by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'transaction',
            keys: hashes,
        }, ...args})
    },
    /**
     * Scan transactions by sender, sort by created
     */
    scanSenderCreated: async ({sender, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transaction',
            index: 'sender',
            indexValue: sender,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan transactions by period, sort by created
     */
    scanPeriodCreated: async ({period, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'transaction',
            index: 'period',
            indexValue: period,
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
}