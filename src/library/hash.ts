import { Utils } from './utils'
import { Crypto } from './crypto'

export const Hash = {
    transaction: async (body): Promise<string> => {
        return Hash.values([
            body.sender,
            body.instructions,
            body.nonce])
    },
    allowance: async (body): Promise<string> => {
        return Hash.values([
            body.address,
            body.spender,
            body.token])
    },
    balance: async (body): Promise<string> => {
        return Hash.values([
            body.address,
            body.token])
    },
    values: async (values): Promise<string> => {
        var bytes = new TextEncoder().encode(JSON.stringify(values))
        var enc = await Crypto.hash(bytes, 'sha256')
        return Utils.base58encode(enc)
    },
    string: async (body, double=true): Promise<string> => {
        var bytes = new TextEncoder().encode(body)
        var enc = await Crypto.hash(bytes, 'sha256')
        if (double) enc = await Crypto.hash(enc, 'sha256')
        return Utils.base58encode(enc)
    },
    inverse: (hash): string => {
        return Utils.base58encode(Utils.base58decode(hash).reverse())
    }
}