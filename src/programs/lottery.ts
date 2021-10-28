import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

export class Lottery {
    public pool

    /**
     * Create lottery pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token', 'expires'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'lottery'}}, {token: pool.token})
    }

    /**
     * Init lottery pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to lottery pool
     */
    transfer(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            amount: tx.amount,
            function: 'lottery.transfer',
        }})
    }

    /**
     * Claim from lottery pool
     */
    claim() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'lottery.claim',
        }})
    }

    /**
     * Deposit to lottery pool
     */
    deposit(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'lottery.deposit',
        }})
    }

    /**
     * Withdraw from lottery pool
     */
    withdraw() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'lottery.withdraw',
        }})
    }

    /**
     * Close lottery pool
     */
    close() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'lottery.close',
        }})
    }

    /**
     * Clear lottery pool
     */
    clear() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'lottery.clear',
        }})
    }
}