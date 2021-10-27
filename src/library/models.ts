import Big from 'big.js'
import { Utils } from './utils'

export const Models = {
    /**
     * Removes certain fields
     */
    stripFields: (object: object, fields?: string[]): object => {
        if (!fields || !fields.length) return object
        return Object.fromEntries(Object.entries(object).filter(e => !fields.includes(e[0])))
    },
    /**
     * Max field requirements (filter out certain fields)
     */
    filterFields: (object: object, fields?: string[]): object => {
        if (!fields || !fields.length) return object
        return Object.fromEntries(Object.entries(object).filter(e => fields.includes(e[0])))
    },
    /**
     * Validates required fields or throws error
     */
    requiredFields: (object: object, fields: string[]): void => {
        var keys = Object.keys(object)
        if (!fields.every(f => keys.includes(f))) throw Error('input: missing fields')
    },
    /**
     * Guarantee that object contains only specified fields
     */
    exclusiveFields: (object: object, fields: string[]): void => {
        var keys = Object.keys(object)
        if (!keys.every(k => fields.includes(k))) throw Error('input: invalid fields')
    },
    /**
     * 
     */
    parseValues: (object: object, model: object): object => {
        if (!object) return
        
        return Object.fromEntries(Object.entries(object)
            .filter(e => Object.keys(model).includes(e[0]))
            .map(e => {
                if (e[0] == 'data') return e

                var t: string = model[e[0]][0]
                var v: any = e[1]

                if (['string', 'text'].includes(t))
                    try {
                        v = JSON.parse(v)
                    } catch(e) {}

                if (t == 'timestamp') v = Big(v)
                else if (t == 'integer') v = Big(v)
                else if (t == 'number') v = Big(v)
                else if (t == 'boolean') v = v == 'true'

                return [e[0], v]
            }))
    },
    /**
     * 
     */
    validFormats: (object: any, model: object): void => {
        var extended = ['pool.create', 'token.create', 'token.update', 'transaction.batch', 'token.batch', 'allowance.batch'].includes(object.function)
        
        Object.entries(object).forEach(e => {
            if (!Object.keys(model).includes(e[0])) throw Error('input: object contains invalid attribute')

            var t: string = model[e[0]][0]
            var v: any = e[1]

            // Parse string integers and decimals as big
            if (t == 'integer') object[e[0]] = Big(v).round()
            else if (t == 'timestamp') object[e[0]] = Big(v).round()
            else if (t == 'number') object[e[0]] = Big(v).round(8)

            if (['integer', 'number', 'timestamp'].includes(t)) v = Big(v)

            if (t == 'string' && typeof v == 'string' && ((extended && v.length <= 8192) || v.length <= 256)) return
            else if (t == 'strings' && v instanceof Array && v.every(a => typeof a == 'string' && v.length <= 256) && v.length && v.length <= 100 && v.length == Utils.unique(v).length) return
            else if (t == 'hash' && typeof v == 'string' && v.length >= 32 && v.length <= 44) return
            else if (t == 'hashes' && v instanceof Array && v.every(a => typeof a == 'string' && a.length >= 32 && a.length <= 44 && v.length && v.length <= 100 && v.length == Utils.unique(v).length)) return
            else if (t == 'timestamp' && v.gte(1e12) && v.lt(1e13)) return
            else if (t == 'integer' && v.gte(0) && v.lte(1e15)) return
            else if (t == 'number' && v.gte(0) && v.lte(1e15)) return
            else if (t == 'boolean' && typeof v == 'boolean') return
            else if (t == 'text' && typeof v == 'string' && v.length <= 8192) return
            else throw Error('input: incorrect format for '+e[0])
        })
    } 
}
