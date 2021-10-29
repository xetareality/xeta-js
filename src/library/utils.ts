// import * as forge from 'node-forge'
import { sha256 } from 'js-sha256';

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
     * Encodes message as sha256
     */
    sha256: async (message: string, double: boolean = false): Promise<Uint8Array> => {
        var h = sha256.create()
        h.update(message)
        if (double) h.update(message)
        return new Uint8Array(h.digest())
    },
    /**
     * Strip kv pairs where value is null or undefined
     */
    strip: (object: object): object => Object.fromEntries(Object.entries(object).filter(e => e[1] != null && e[1] != undefined)),
    /**
     * Returns global var
     */
    global: () => {
        if (typeof globalThis !== 'undefined') return globalThis
        if (typeof self !== 'undefined') return self
        if (typeof window !== 'undefined') return window
        if (typeof global !== 'undefined') return global
        throw new Error('unable to locate global object')
    },
    /**
     * Sleep function
     */
    sleep: (ms: number) => new Promise(r => setTimeout(r, ms)),
}