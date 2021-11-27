import { $fetch } from 'ohmyfetch'
import { Config } from '../library/config'
import { Utils } from '../library/utils'

export const Resource = {
    /**
     * Read resource by key
     */
    read: async ({type, key, sort=null, sortValue=null, fields=null, preview=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        return $fetch(Config.interface+'/read'+(Config.dev ? '?dev=1' : ''), {
            method: 'GET',
            params: Utils.strip({
                type: type,
                keyValue: key,
                sort: sort,
                sortValue: sortValue,
                preview: preview,
            }),
        }).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * List resources by keys
     */
    list: async ({type, keys, sort=null, sortValues=null, fields=null, preview=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        return $fetch(Config.interface+'/list'+(Config.dev ? '?dev=1' : ''), {
            method: 'GET',
            params: Utils.strip({
                type: type,
                keyValues: keys.join(','),
                sort: sort,
                sortValues: sortValues,
                preview: preview,
            }),
        }).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * Scan resources by index
     * Candles and statistics support scanning without index (by key, sorted by time)
     */
    scan: async ({type, index, indexValue, sort=null, sortValue=null, keyValue=null, operator=null, asc=false, limit=null, preview=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        if (['candle', 'statistic'].includes(type)) limit = limit ? Math.min(limit, 1000) : 200
        else limit = limit ? Math.min(limit, 25) : 25

        return $fetch(Config.interface+'/scan'+(Config.dev ? '?dev=1' : ''), {
            method: 'GET',
            params: Utils.strip({
                type: type,
                keyValue: keyValue,
                index: index,
                indexValue: indexValue,
                sort: sort,
                sortValue: sortValue,
                operator: operator,
                asc: asc,
                limit: limit,
                preview: preview,
            }),
        }).catch(e => {
            throw Error(e.data)
        })
    },
}