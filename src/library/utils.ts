import Big from 'big.js'

export const Utils = {
    /**
     * Returns a unique array
     */
    unique: (arr) => arr.filter((v, i, a) => a.indexOf(v) === i),
    /**
     * Base58 alphabet
     */
    base58alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    /**
     * Base58 encode Uint8Array
     */
    base58encode: (B: Uint8Array): string => {var d=[],s="",i,j,c,n;for(i in B){j=0,c=B[i];s+=c||s.length^i?"":1;while(j in d||c){n=d[j];n=n?n*256+c:c;c=n/58|0;d[j]=n%58;j++}}while(j--)s+=Utils.base58alphabet[d[j]];return s},
    /**
     * Base58 decode string
     */
    base58decode: (S: string): Uint8Array => {var d=[],b=[],i,j,c,n;for(i in S.split('')){j=0,c=Utils.base58alphabet.indexOf(S[i]);if(c<0)return undefined;c||b.length^i?i:b.push(0);while(j in d||c){n=d[j];n=n?n*58+c:c;c=n>>8;d[j]=n%256;j++}}while(j--)b.push(d[j]);return new Uint8Array(b)},
    /**
     * Strip kv pairs where value is null or undefined
     */
    strip: (object, min=1) => {
        var out = Object.fromEntries(Object.entries(object).filter(e => e[1] != null))
        if (Object.keys(out).length < min) throw Error('parameters:missing')
        return out
    },
    /**
     * Sleep function
     */
    sleep: (s: number) => new Promise(r => setTimeout(r, s*1000)),
    /**
     * Format amount to amount string
     */
    amount: (amount) => {
        if (amount == null) return
        return Big(amount).round(8).toString()
    },
    /**
     * Returns the resource at instruction i at index j
     */
    output: (transaction, instruction=0, index=0) => {
        if (transaction.outputs.length <= instruction) throw Error('instruction:length')
        if (transaction.outputs[instruction].length <= index) throw Error('index:length')
        return transaction.outputs[instruction][index].split(':')[1]
    },
    /**
     * Returns key name based on resource
     */
    key: (resource) => ({
        token: 'address',
        pool: 'address',
        address: 'address',
        allowance: 'hash',
        balance: 'hash',
        claim: 'hash',
        wallet: 'hash',
        transaction: 'hash',
        transfer: 'hash',
        object: 'hash',
        candle: 'key',
        statistic: 'key',
    }[resource]),
}