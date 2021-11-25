import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'

export const Registry = {
    /**
     * Read object by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'object',
            key: hash,
        }, ...args})
    },
    /**
     * List objects by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'object',
            keys: hashes,
        }, ...args})
    },
    /**
     * Scan objects by content, sort by created
     */
    scanHashCreated: async ({content, created=null, token=null}, args={}) => {
        return Resource.scan({...{
            type: 'object',
            index: 'content',
            indexValue: content,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
    /**
     * Scan objects by fingerprint, sort by created
     */
    scanFingerprintCreated: async ({fingerprint, created=null, token=null}, args={}) => {
        return Resource.scan({...{
            type: 'object',
            index: 'fingerprint',
            indexValue: fingerprint,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
    /**
     * Scan objects by cluster, sort by created
     */
    scanClusterCreated: async ({cluster, created=null, token=null}, args={}) => {
        return Resource.scan({...{
            type: 'object',
            index: 'cluster',
            indexValue: cluster,
            sort: 'created',
            sortValue: created,
            keyValue: token,
        }, ...args})
    },
}