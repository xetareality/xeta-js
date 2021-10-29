import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Transaction } from './transaction'

export const Candle = {
    /**
     * Scan candles by token and interval
     */
    scan: async (token: string, interval: string, time?: number, sort: string = 'DESC', limit: number = 25) => {
        var r = await $fetch.raw(Config.interface+'/candles', {
            method: 'GET',
            params: {token: token, interval: interval, time: time, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.CANDLE))
    },
    /**
     * Scan candles by interval and time sorted by turnover
     */
    scanByTurnover: async (interval: string = '1d', time?: number, key?: string, sort: string = 'DESC', limit: number = 25) => {
        if (!time) time = Math.round((Date.now()/1000) - (Date.now()/1000) % (60*60*24))

        var r = await $fetch.raw(Config.interface+'/candles', {
            method: 'GET',
            params: {interval: interval, time: time, key: key, turnover: 1, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.CANDLE))
    },
    /**
     * Scan candles by interval and time sorted by change
     */
    scanByChange: async (interval: string = '1d', time?: number, key?: string, sort: string = 'DESC', limit: number = 25) => {
        if (!time) time = Math.round((Date.now()/1000) - (Date.now()/1000) % (60*60*24))

        var r = await $fetch.raw(Config.interface+'/candles', {
            method: 'GET',
            params: {interval: interval, time: time, key: key, change: 1, sort: sort, limit: limit},
        }).catch(e => {
            throw Error(e.data)
        })

        return r.data.map(d => Models.parseValues(d, Models.CANDLE))
    },
}