import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'

export const Lookup = {
    /**
     * Read lookup by token address
     */
    read: async ({token}, args={}) => {
        return Resource.read({...{
            type: 'lookup',
            key: token,
        }, ...args})
    },
    /**
     * List lookups by token addresses
     */
    list: async ({tokens}, args={}) => {
        return Resource.list({...{
            type: 'lookup',
            keys: tokens,
        }, ...args})
    },
    /**
     * Scan tokens by hash, sort by created
     */
    scanHashCreated: async ({hash, created=None, token=None}, args={}) => {
        return Resource.scan({...{
            type: 'lookup',
            index: 'hash',
            indexValue: hash,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
    /**
     * Scan tokens by fingerprint, sort by created
     */
    scanFingerprintCreated: async ({fingerprint, created=None, token=None}, args={}) => {
        return Resource.scan({...{
            type: 'lookup',
            index: 'fingerprint',
            indexValue: fingerprint,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
    /**
     * Scan tokens by cluster, sort by created
     */
    scanClusterCreated: async ({cluster, created=None, token=None}, args={}) => {
        return Resource.scan({...{
            type: 'lookup',
            index: 'cluster',
            indexValue: cluster,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
}