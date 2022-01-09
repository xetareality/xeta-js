import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hash } from '../library/hash'

import { Auction } from '../programs/auction'
import { Launch } from '../programs/launch'
import { Lending } from '../programs/lending'
import { Lock } from '../programs/lock'
import { Loot } from '../programs/loot'
import { Lottery } from '../programs/lottery'
import { Royalty } from '../programs/royalty'
import { Staking } from '../programs/staking'
import { Swap } from '../programs/swap'
import { Vote } from '../programs/vote'

export const Pool = {
    /**
     * Create pool
     */
    create: async ({token, program, name=null, description=null, mechanism=null, candidates=null, rate=null, percentage=null, number=null, expires=null, answers=null, meta=null, minAmount=null, maxAmount=null, minTime=null, maxTime=null, transfersLimit=null, claimsLimit=null, tokenLimit=null, xetaLimit=null, tokenTarget=null, xetaTarget=null}, tx={}) => {
        return Instruction.wrap({
            function: 'pool.create',
            token: token,
            program: program,
            name: name,
            description: description,
            mechanism: mechanism,
            candidates: candidates,
            rate: rate,
            percentage: percentage,
            number: number,
            expires: expires,
            answers: answers,
            meta: meta,
            minAmount: Utils.amount(minAmount),
            maxAmount: Utils.amount(maxAmount),
            minTime: minTime,
            maxTime: maxTime,
            transfersLimit: transfersLimit,
            claimsLimit: claimsLimit,
            tokenLimit: Utils.amount(tokenLimit),
            xetaLimit: Utils.amount(xetaLimit),
            tokenTarget: Utils.amount(tokenTarget),
            xetaTarget: Utils.amount(xetaTarget),
        }, tx)
    },
    /**
     * Get pool by address
     * Return as program instance
     */
    instance: async ({address}, args={}) => {
        var pool = await Pool.read({address: address})
        if (!pool) return
        return new {
            auction: Auction,
            launch: Launch,
            lending: Lending,
            lock: Lock,
            loot: Loot,
            lottery: Lottery,
            royalty: Royalty,
            staking: Staking,
            swap: Swap,
            vote: Vote,
        }[pool.program](pool)
    },
    /**
     * Read pool by address
     */
    read: async ({address}, args={}) => {
        return Resource.read({...{
            type: 'pool',
            key: address,
        }, ...args})
    },
    /**
     * List pools by addresses
     */
    list: async ({addresses}, args={}) => {
        return Resource.list({...{
            type: 'pool',
            keys: addresses,
        }, ...args})
    },
    /**
     * Scan pools by token and program, sort by created
     */
    scanTokenProgramCreated: async ({token, program, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'tokenProgram',
            indexValue: (await Hash.values([token, program])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by token and program, sort by created
     */
    scanCreatorProgramCreated: async ({creator, program, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'creatorProgram',
            indexValue: (await Hash.values([creator, program])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by name, sort by created
     */
    scanNameCreated: async ({name, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'name',
            indexValue: name,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by creator, sort by created
     */
    scanCreatorCreated: async ({creator, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'creator',
            indexValue: creator,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by created
     */
    scanProgramCreated: async ({program, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by expires
     */
    scanProgramExpires: async ({program, expires=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'expires',
            sortValue: expires,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by number
     */
    scanProgramNumber: async ({program, number=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'number',
            sortValue: number,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by xetaBalance
     */
    scanProgramXetaBalance: async ({program, xetaBalance=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'xetaBalance',
            sortValue: xetaBalance,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by tokenBalance
     */
    scanProgramTokenBalance: async ({program, tokenBalance=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'tokenBalance',
            sortValue: tokenBalance,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan pools by active program, sort by transfersCount
     */
    scanProgramTransfersCount: async ({program, transfersCount=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'pool',
            index: 'activeProgram',
            indexValue: program,
            sort: 'transfersCount',
            sortValue: transfersCount,
            keyValue: address,
        }, ...args})
    },
}