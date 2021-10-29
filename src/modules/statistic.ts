import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Statistic = {
    /**
     * Get statistic by key and time
     */
    get: async ({key, time}) => {
        return Models.parseValues(await $fetch(Config.interface+'/statistic', {
            method: 'GET',
            params: {key: key, time: time},
        }).catch(e => {
            throw Error(e.data)
        }), Models.STATISTIC)
    },
    /**
     * Scan statistics by key
     */
    scan: async ({key, time=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/statistics', {
            method: 'GET',
            params: Utils.strip({key: key, time: time, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.STATISTIC))
    },
}