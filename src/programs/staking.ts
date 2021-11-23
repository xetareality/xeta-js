import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

export class Staking {
    public pool

    /**
     * Create staking pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'staking'}})
    }

    /**
     * Init staking pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to staking pool
     */
    transfer({amount, unlocks=null, expires=null}, tx={}) {
        if (unlocks && unlocks < Date.now()+24*60*60*1000) throw Error('invalid:time')

        return Instruction.wrap({
            function: 'staking.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Claim from staking pool
     */
    claim({claim}, tx={}) {
        return Instruction.wrap({
            function: 'staking.claim',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Deposit to staking pool
     */
    deposit({amount, unlocks=null, expires=null}, tx={}) {
        return Instruction.wrap({
            function: 'staking.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Withdraw from staking pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'staking.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }
}