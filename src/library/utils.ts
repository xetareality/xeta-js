import * as hash from 'hash.js'

export const Utils = {
    /**
     * Returns a unique array
     */
    unique: (arr: any[]) => arr.filter((v, i, a) => a.indexOf(v) === i),
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
     * Encodes string based on specified algorithm
     * Returns Uint8Array
     */
    encrypt: async (text: string, algorithm: string = 'sha256', double: boolean = false) => {
        var h = {sha256: hash.sha256}[algorithm]()
        h.update(text)
        if (double) h.update(text)
        return new Uint8Array(h.digest())
    },
}