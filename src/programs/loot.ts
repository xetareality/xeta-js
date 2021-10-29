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
        return Pool.create({...pool, ...{program: 'loot'}}, {token: pool.token})
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
    transfer(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'loot.transfer',
        }})
    }

    /**
     * Deposit to loot pool
     */
    deposit(tx) {
        Models.requiredFields(tx, ['token'])
        Models.validFormats(tx, Models.TRANSACTION)

        if (tx.amount && !tx.amount.eq(1)) throw Error('validation: amount must be empty or one')

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: tx.token,
            amount: 1,
            function: 'loot.deposit',
        }})
    }

    /**
     * Withdraw from loot pool
     */
    withdraw(tx) {
        Models.requiredFields(tx, ['token'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: tx.token,
            function: 'loot.withdraw',
        }})
    }

    /**
     * Clear loot pool
     */
    clear() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'loot.clear',
        }})
    }
}