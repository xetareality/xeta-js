import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

export class Auction {
    public pool

    /**
     * Create auction pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token', 'expires'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'auction'}}, {token: pool.token})
    }

    /**
     * Init auction pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to auction pool
     */
    transfer(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            amount: tx.amount,
            function: 'auction.transfer',
        }})
    }

    /**
     * Deposit to auction pool
     */
    deposit(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'auction.deposit',
        }})
    }

    /**
     * Resolve auction pool
     */
    resolve() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            token: Config.xetaAddress,
            amount: 0,
            function: 'auction.resolve',
        }})
    }

    /**
     * Cancel auction pool
     */
    cancel() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            token: Config.xetaAddress,
            amount: 0,
            function: 'auction.cancel',
        }})
    }

    /**
     * Close auction pool
     */
    close() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            token: Config.xetaAddress,
            amount: 0,
            function: 'auction.close',
        }})
    }
}