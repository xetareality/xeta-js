import { $fetch } from 'ohmyfetch'
import { Models } from '../library/models'
import { Config } from '../library/config'
import { Utils } from '../library/utils'
import { Transaction } from './transaction'

import { Auction } from '../programs/auction'
import { Launch } from '../programs/launch'
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
    create: async ({token, program, name=null, mechanism=null, candidates=null, rate=null, percentage=null, probability=null, expires=null, answers=null, minAmount=null, maxAmount=null, minTime=null, maxTime=null, transfersLimit=null, claimsLimit=null, tokenLimit=null, xetaLimit=null, tokenTarget=null, xetaTarget=null}, tx={}) => {
        var result = await Transaction.create({...tx, ...{
            token: token,
            function: 'pool.create',
            message: JSON.stringify(Utils.strip({
                program: program,
                name: name,
                mechanism: mechanism,
                candidates: candidates,
                rate: rate,
                percentage: percentage,
                probability: probability,
                expires: expires,
                answers: answers,
                minAmount: minAmount,
                maxAmount: maxAmount,
                minTime: minTime,
                maxTime: maxTime,
                transfersLimit: transfersLimit,
                claimsLimit: claimsLimit,
                tokenLimit: tokenLimit,
                xetaLimit: xetaLimit,
                tokenTarget: tokenTarget,
                xetaTarget: xetaTarget,
            })),
        }})

        result.data = new {
            auction: Auction,
            launch: Launch,
            lock: Lock,
            loot: Loot,
            lottery: Lottery,
            royalty: Royalty,
            staking: Staking,
            swap: Swap,
            vote: Vote,
        }[result.data.program](Models.parseValues(result.data, Models.POOL))
        return result
    },
    /**
     * Get pool by address
     * Return as program instance
     */
    get: async ({address}) => {
        var result = await $fetch(Config.interface+'/pool', {
            method: 'GET',
            params: {address: address},
        }).catch(e => {
            throw Error(e.data)
        })

        if (!result) return
        return new {
            auction: Auction,
            launch: Launch,
            lock: Lock,
            loot: Loot,
            lottery: Lottery,
            royalty: Royalty,
            staking: Staking,
            swap: Swap,
            vote: Vote,
        }[result.program](Models.parseValues(result, Models.POOL))
    },
    /**
     * Scan pools by token
     */
    scanByToken: async ({token, address=null, program=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/pools', {
            method: 'GET',
            params: Utils.strip({token: token, address: address, program: program, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.POOL))
    },
    /**
     * Scan pools by creator
     */
    scanByCreator: async ({creator, address=null, program=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/pools', {
            method: 'GET',
            params: Utils.strip({creator: creator, address: address, program: program, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.POOL))
    },
    /**
     * Scan pools by name
     */
    scanByName: async ({name, address=null, program=null, sort='DESC', limit=25}) => {
        return (await $fetch(Config.interface+'/pools', {
            method: 'GET',
            params: Utils.strip({name: name, address: address, program: program, sort: sort, limit: limit}),
        }).catch(e => {
            throw Error(e.data)
        })).map(d => Models.parseValues(d, Models.POOL))
    },
}