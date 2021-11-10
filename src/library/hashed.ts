import { Utils } from './utils'

export const Hashed = {
    transaction: async (body): Promise<string> => {
        return Hashed.fields(body, ['from', 'to', 'sender', 'token', 'amount', 'nonce', 'function', 'message'])
    },
    allowance: async (body): Promise<string> => {
        return Hashed.fields(body, ['address', 'token', 'spender'])
    },
    claim: async (body): Promise<string> => {
        return Hashed.fields(body, ['address', 'token', 'owner'])
    },
    pool: async (body): Promise<string> => {
        return Hashed.fields(body, ['token', 'program'])
    },
    token: async (body): Promise<string> => {
        return Hashed.fields(body, ['name', 'ticker', 'supply'])
    },
    balance: async (body): Promise<string> => {
        return Hashed.fields(body, ['address', 'token'])
    },
    fields: async (body, fields=[]): Promise<string> => {
        var values = fields.map(f => body[f])
        var enc = await Utils.sha256(JSON.stringify(values.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    string: async (body): Promise<string> => {
        var enc = await Utils.sha256(body, true)
        return Utils.base58encode(enc)
    },
}