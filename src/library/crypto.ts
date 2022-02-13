import { Config } from './config'
import { Utils } from './utils'
import * as ed from '@noble/ed25519'
import * as scrypt from 'scrypt-js'

export const Crypto = {
    generatePrivate: (): string => {
        return Utils.base58encode(
            ed.utils.randomPrivateKey())
    },
    generatePublic: async (privateKey: string): Promise<string> => {
        return Utils.base58encode(
            await ed.getPublicKey(Utils.base58decode(privateKey)))
    },
    generateKeypair: async (): Promise<string[]> => {
        var privateKey = Crypto.generatePrivate()
        return [await Crypto.generatePublic(privateKey), privateKey]
    },
    sign: async (message: string, privateKey: string): Promise<string> => {
        return Utils.base58encode(await ed.sign(
            Utils.base58decode(message),
            Utils.base58decode(privateKey)))
    },
    verify: async (message: string, signature: string, publicKey: string): Promise<boolean> => {
        return ed.verify(
            Utils.base58decode(signature),
            Utils.base58decode(message),
            Utils.base58decode(publicKey))
    },
    crypto: () => {
        var webCrypto = typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
        var nodeRequire = typeof module !== 'undefined' && typeof module.require === 'function' && module.require.bind(module)

        return {node: nodeRequire && !webCrypto ? nodeRequire('crypto') : undefined, web: webCrypto}
    },
    hash: async (bytes, algorithm) => {
        var crypto = Crypto.crypto()
        if (crypto.web) return new Uint8Array(await crypto.web.subtle.digest({sha256: 'SHA-256', sha512: 'SHA-512'}[algorithm], bytes))
        else if (crypto.node) return new Uint8Array(crypto.node.createHash(algorithm).update(bytes).digest())
        else throw new Error('hashing:unavailable')
    },
    /**
     * Pbkdf2 implementation using the native crypto module
     */
    pbkdf2: async (message, salt=null) => {
        var crypto = Crypto.crypto()

        if (crypto.web) {
            var key = await crypto.web.subtle.importKey('raw', new TextEncoder().encode(message), 'PBKDF2', false, ['deriveBits'])
            var buffer = await crypto.web.subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(salt || ''), iterations: 1e6}, key, 256)
            return Utils.base58encode(new Uint8Array(buffer))
        }
        else if (crypto.node) {
            return new Promise((resolve, reject) => {
                crypto.node.pbkdf2(message, salt || '', 1e6, 32, 'sha256', (err, buffer) => {
                    if (err) reject(err)
                    resolve(Utils.base58encode(new Uint8Array(buffer)))
                })
            })
        }
        else throw Error('hashing:unavailable')
    },
    /**
     * Scrypt implementation to generate brain wallet
     * Uses account value as salt combined with secret password
     */
    brainwallet: (account, secret) => {
        if (account.length < 6 || account.length > 80 || !/^[a-zA-Z0-9-+@_\.]*$/.test(account)) throw Error('account:format')
        if (secret.length < 6 || secret.length > 80 || !/^[a-zA-Z0-9-+@_\.]*$/.test(account)) throw Error('secret:format')

        var bytes = scrypt.syncScrypt(
            new TextEncoder().encode(secret),
            new TextEncoder().encode(account),
            1<<16, 8, 1, 32
        )

        return Utils.base58encode(bytes)
    }
}