import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

export class Loot {
    public pool

    /**
     * Create loot pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'loot'}})
    }

    /**
     * Init loot pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to loot pool
     */
    transfer({amount}, tx={}) {
        return Instruction.wrap({
            function: 'loot.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Deposit to loot pool
     */
    deposit({token, unlocks=null, expires=null}, tx={}) {
        return Instruction.wrap({
            function: 'loot.deposit',
            pool: this.pool.address,
            token: token,
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Withdraw from loot pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'loot.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Clear loot pool
     */
    clear(tx={}) {
        return Instruction.wrap({
            function: 'loot.clear',
            pool: this.pool.address,
        }, tx)
    }
}