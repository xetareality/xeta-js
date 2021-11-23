import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'

export const Statistic = {
    /**
     * Read statistic by key and time
     */
    read: async ({key, time}, args={}) => {
        return Resource.read({...{
            type: 'allowance',
            key: hash,
        }, ...args})
    },
    /**
     * Scan statistics by key, sort by time
     */
    scan: async ({key, time=null}, args={}) => {
        return Resource.scan({...{
            type: 'statistic',
            index: null,
            indexValue: null,
            sort: 'time',
            sortValue: time,
            keyValue: key,
        }, ...args})
    },
}