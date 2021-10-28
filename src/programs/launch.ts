import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

export class Launch {
    public pool

    /**
     * Create launch pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token', 'expires'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'launch'}}, {token: pool.token})
    }

    /**
     * Init launch pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to launch pool
     */
    transfer(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            amount: tx.amount,
            function: 'launch.transfer',
        }})
    }

    /**
     * Swap via launch pool
     */
    swap(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            amount: tx.amount,
            function: 'launch.swap',
        }})
    }

    /**
     * Resolve launch pool
     */
    resolve() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'launch.resolve',
        }})
    }

    /**
     * Claim from launch pool
     */
    claim() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'launch.claim',
        }})
    }

    /**
     * Deposit to launch pool
     */
    deposit(tx) {
        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'launch.deposit',
        }})
    }

    /**
     * Withdraw from launch pool
     */
    withdraw() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'launch.withdraw',
        }})
    }

    /**
     * Close launch pool
     */
    close() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'launch.close',
        }})
    }
}