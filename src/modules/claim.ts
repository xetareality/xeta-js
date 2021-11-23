import { Instruction } from './instruction'
import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'

export const Claim = {
    /**
     * Create claim
     */
    create: async ({owner, token, tokenAmount, xetaAmount=null, expires=null, unlocks=null, frozen=null, category=null, meta=null, answer=null, number=null}, tx={}) => {
        return Instruction.wrap({
            function: 'claim.create',
            owner: owner,
            token: token,
            tokenAmount: Utils.amount(tokenAmount),
            xetaAmount: Utils.amount(xetaAmount),
            expires: expires,
            unlocks: unlocks,
            frozen: frozen,
            category: category,
            meta: meta,
            answer: answer,
            number: number,
        }, tx)
    },
    /**
     * Update claim
     */
    update: async ({claim, tokenAmount=null, xetaAmount=null, expires=null, unlocks=null, frozen=null, category=null, meta=null, answer=null, number=null}, tx={}) => {
        return Instruction.wrap({
            function: 'claim.update',
            claim: claim,
            tokenAmount: Utils.amount(tokenAmount),
            xetaAmount: Utils.amount(xetaAmount),
            expires: expires,
            unlocks: unlocks,
            frozen: frozen,
            category: category,
            meta: meta,
            answer: answer,
            number: number,
        }, tx)
    },
    /**
     * Transfer claim
     */
    transfer: async ({claim, to}, tx={}) => {
        return Instruction.wrap({
            function: 'claim.transfer',
            claim: claim,
            to: to,
        }, tx)
    },
    /**
     * Resolve claim
     */
    resolve: async ({claim}, tx={}) => {
        return Instruction.wrap({
            function: 'claim.resolve',
            claim: claim,
        }, tx)
    },
    /**
     * Read claim by hash
     */
    read: async ({hash}, args={}) => {
        return Resource.read({...{
            type: 'claim',
            key: hash,
        }, ...args})
    },
    /**
     * List claims by hashes
     */
    list: async ({hashes}, args={}) => {
        return Resource.list({...{
            type: 'claim',
            keys: hashes,
        }, ...args})
    },
    /**
     * Scan claims by holder and category, sort by created
     */
    scanHolderCategoryCreated: async ({holder, category, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'holderCategory',
            indexValue: (await Hashed.values([holder, category])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer and category, sort by created
     */
    scanIssuerCategoryCreated: async ({issuer, category, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuerCategory',
            indexValue: (await Hashed.values([issuer, category])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, sort by answer
     */
    scanIssuerAnswer: async ({issuer, answer=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuer',
            indexValue: (await Hashed.values([issuer])).slice(-8),
            sort: 'answer',
            sortValue: answer,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, sort by number
     */
    scanIssuerNumber: async ({issuer, number=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuer',
            indexValue: (await Hashed.values([issuer])).slice(-8),
            sort: 'number',
            sortValue: number,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, sort by tokenAmount
     */
    scanIssuerTokenAmount: async ({issuer, tokenAmount=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuer',
            indexValue: (await Hashed.values([issuer])).slice(-8),
            sort: 'tokenAmount',
            sortValue: tokenAmount,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, sort by xetaAmount
     */
    scanIssuerXetaAmount: async ({issuer, xetaAmount=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuer',
            indexValue: (await Hashed.values([issuer])).slice(-8),
            sort: 'xetaAmount',
            sortValue: xetaAmount,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, sort by created
     */
    scanIssuerCreated: async ({issuer, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuer',
            indexValue: (await Hashed.values([issuer])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by holder, sort by created
     */
    scanHolderCreated: async ({holder, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'holder',
            indexValue: (await Hashed.values([holder])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer and token, sort by created
     */
    scanIssuerTokenCreated: async ({issuer, token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuerToken',
            indexValue: (await Hashed.values([issuer, token])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by holder and token, sort by created
     */
    scanHolderTokenCreated: async ({holder, token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'holderToken',
            indexValue: (await Hashed.values([holder, token])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer and holder, sort by created
     */
    scanIssuerHolder: async ({issuer, holder, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuerHolder',
            indexValue: (await Hashed.values([issuer, holder])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
    /**
     * Scan claims by issuer, holder and token, sort by created
     */
    scanIssuerHolderToken: async ({issuer, holder, token, created=null, hash=null}, args={}) => {
        return Resource.scan({...{
            type: 'claim',
            index: 'issuerHolderToken',
            indexValue: (await Hashed.values([issuer, holder, token])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: hash,
        }, ...args})
    },
}