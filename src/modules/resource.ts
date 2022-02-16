import { $fetch } from 'ohmyfetch'
import { Config } from '../library/config'
import { Utils } from '../library/utils'

export const Resource = {
    /**
     * Read resource by key
     */
    read: async ({type, key, sort=null, sortValue=null, fields=null, preview=null, fetch=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        var params = new URLSearchParams(Utils.strip({
            type: type,
            keyValue: key,
            sort: sort,
            sortValue: sortValue,
            preview: preview,
            dev: Config.dev,
            identity: Config.identity,
        }) as any).toString()

        return (fetch || $fetch)(Config.interface+'/read?'+params).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * List resources by keys
     */
    list: async ({type, keys, sort=null, sortValues=null, fields=null, preview=null, fetch=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        var params = new URLSearchParams(Utils.strip({
            type: type,
            keyValues: keys.join(','),
            sort: sort,
            sortValues: sortValues,
            preview: preview,
            dev: Config.dev,
            identity: Config.identity,
        }) as any).toString()

        return (fetch || $fetch)(Config.interface+'/list?'+params).catch(e => {
            throw Error(e.data)
        })
    },
    /**
     * Scan resources by index
     * Candles and statistics support scanning without index (by key, sorted by time)
     */
    scan: async ({type, index, indexValue, sort=null, sortValue=null, keyValue=null, operator=null, asc=false, limit=null, preview=null, extend=null, fetch=null}) => {
        if (!['allowance', 'balance', 'candle', 'claim', 'object', 'pool', 'statistic', 'token', 'transaction', 'transfer', 'wallet'].includes(type)) throw Error('type:invalid')

        if (['candle', 'statistic'].includes(type)) limit = limit ? Math.min(limit, 1000) : 200
        else limit = limit ? Math.min(limit, 25) : 25

        var params = new URLSearchParams(Utils.strip({
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
            extend: extend,
            dev: Config.dev,
            identity: Config.identity,
        }) as any).toString()

        return (fetch || $fetch)(Config.interface+'/scan?'+params).catch(e => {
            throw Error(e.data)
        })
    },
}