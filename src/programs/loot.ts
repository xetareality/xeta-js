import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

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
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'loot.transfer',
        }})
    }

    /**
     * Deposit to loot pool
     */
    deposit({token}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: token,
            amount: 1,
            function: 'loot.deposit',
        }})
    }

    /**
     * Withdraw from loot pool
     */
    withdraw({token}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: token,
            function: 'loot.withdraw',
        }})
    }

    /**
     * Clear loot pool
     */
    clear(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'loot.clear',
        }})
    }
}