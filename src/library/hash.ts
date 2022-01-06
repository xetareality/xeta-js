import { Utils } from './utils'

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
        var enc = await Utils.sha256(JSON.stringify(values))
        return Utils.base58encode(enc)
    },
    string: async (body, double=true): Promise<string> => {
        var enc = await Utils.sha256(body, double)
        return Utils.base58encode(enc)
    },
    inverse: (hash): string => {
        return Utils.base58encode(Utils.base58decode(hash).reverse())
    }
}