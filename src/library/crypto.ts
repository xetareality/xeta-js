import { Config } from './config'
import { Utils } from './utils'
import * as ed from 'noble-ed25519'

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
        var privateKey = Wallet.generatePrivate()
        return [await Wallet.generatePublic(privateKey), privateKey]
    },
    sign: async (message: string, privateKey: string): Promise<string> => {
        return Utils.base58encode(await ed.sign(
            Utils.base58decode(message),
            Utils.base58decode(privateKey)))
    },
    verify: async (message: string, signature: string, publicKey: string): Promise<boolean> => {
        return await ed.verify(
            Utils.base58decode(signature),
            Utils.base58decode(message),
            Utils.base58decode(publicKey))
    },
}