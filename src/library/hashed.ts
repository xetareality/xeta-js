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
            body.token,
            body.spender])
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
    string: async (body): Promise<string> => {
        var enc = await Utils.sha256(body, true)
        return Utils.base58encode(enc)
    },
}