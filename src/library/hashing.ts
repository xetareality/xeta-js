import { Utils } from './utils'

export const Hashing = {
    transaction: async (body): Promise<string> => {
        var fields = [
            body.from,
            body.to,
            body.sender,
            body.token,
            body.amount,
            body.nonce,
            body.function,
            body.message]

        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    allowance: async (body): Promise<string> => {
        var fields = [
            body.address,
            body.token,
            body.spender]
        
        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    claim: async (body): Promise<string> => {
        var fields = [
            body.address,
            body.token,
            body.owner]

        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    pool: async (body): Promise<string> => {
        var fields = [
            body.token,
            body.program]

        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    token: async (body): Promise<string> => {
        var fields = [
            body.name,
            body.ticker,
            body.supply]
        
        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    balance: async (body): Promise<string> => {
        var fields = [
            body.address,
            body.token]
        
        var enc = await Utils.sha256(JSON.stringify(fields.map(f => f != null ? f.toString() : f)))
        return Utils.base58encode(enc)
    },
    string: async (body): Promise<string> => {
        var enc = await Utils.sha256(body, true)
        return Utils.base58encode(enc)
    },
}