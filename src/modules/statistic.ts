import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Statistic = {
    /**
     * Get statistic by key and time
     */
    get: async (key: string, time: number) => {
        var r = await $fetch.raw(Config.interface+'/statistic', {
            method: 'GET',
            params: {key: key, time: time},
        }).catch(e => {
            throw Error(e.data)
        })

        return Models.parseValues(r.data, Models.STATISTIC)
    },
    /**
     * Scan statistics by key
     */
    scan: async (key: string, time?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/statistics', {
            method: 'GET',
            params: {key: key, time: time, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.STATISTIC))
    },
}