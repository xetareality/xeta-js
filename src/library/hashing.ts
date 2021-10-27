import { Utils } from './utils'

export const Hashing = {
    transaction: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.token,
            body.from,
            body.to,
            body.amount,
            body.function,
            body.message,
            body.nonce]

        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    allowance: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.address,
            body.token,
            body.spender]
        
        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    claim: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.address,
            body.token,
            body.owner]

        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    pool: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.token,
            body.program]

        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    token: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.name,
            body.ticker,
            body.supply]
        
        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    balance: async (body: any): Promise<Uint8Array> => {
        var fields = [
            body.address,
            body.token]
        
        return await Utils.encrypt(JSON.stringify(fields.map(f => f != null ? f.toString() : f)), 'sha256')
    },
    string: async (body): Promise<string> => {
        var buf = await Utils.encrypt(body, 'sha256', true)
        return Utils.base58encode(buf)
    },
}