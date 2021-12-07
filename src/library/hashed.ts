import { Utils } from './utils'

export const Hashed = {
    transaction: async (body): Promise<string> => {
        return Hashed.values([
            body.sender,
            body.instructions,
            body.nonce])
    },
    allowance: async (body): Promise<string> => {
        return Hashed.values([
            body.address,
            body.spender,
            body.token])
    },
    balance: async (body): Promise<string> => {
        return Hashed.values([
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
}