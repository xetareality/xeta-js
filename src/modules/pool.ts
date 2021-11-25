import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Hashed } from '../library/hashed'

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
    create: async ({token, program, name=null, mechanism=null, candidates=null, rate=null, percentage=null, probability=null, expires=null, answers=null, meta=null, minAmount=null, maxAmount=null, minTime=null, maxTime=null, transfersLimit=null, claimsLimit=null, tokenLimit=null, xetaLimit=null, tokenTarget=null, xetaTarget=null}, tx={}) => {
        if (!['auction', 'launch', 'lending', 'lock', 'loot', 'lottery', 'royalty', 'staking', 'vote'].includes(program)) throw Error('program:invalid')

        return Instruction.wrap({
            function: 'pool.create',
            token: token,
            program: program,
            name: name,
            mechanism: mechanism,
            candidates: candidates,
            rate: rate,
            percentage: percentage,
            probability: probability,
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
            indexValue: (await Hashed.values([token, program])).slice(-8),
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
}