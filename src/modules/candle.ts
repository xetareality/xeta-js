import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Candle = {
    /**
     * Scan candles by token and interval
     */
    scan: async ({token, interval, time=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/candles', {
            method: 'GET',
            params: Utils.strip({token: token, interval: interval, time: time, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.CANDLE))
    },
    /**
     * Scan candles by interval and time sorted by turnover
     */
    scanByTurnover: async ({interval='1d', time=null, key=null, sort='DESC', limit=25}) => {
        if (!time) time = Math.round((Date.now()/1000) - (Date.now()/1000) % (60*60*24))

        return (await $fetch(Config.interface+'/candles', {
            method: 'GET',
            params: Utils.strip({interval: interval, time: time, key: key, turnover: 1, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.CANDLE))
    },
    /**
     * Scan candles by interval and time sorted by change
     */
    scanByChange: async ({interval='1d', time=null, key=null, sort='DESC', limit=25}) => {
        if (!time) time = Math.round((Date.now()/1000) - (Date.now()/1000) % (60*60*24))

        return (await $fetch(Config.interface+'/candles', {
            method: 'GET',
            params: Utils.strip({interval: interval, time: time, key: key, change: 1, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.CANDLE))
    },
}