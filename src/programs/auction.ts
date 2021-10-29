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
        return Pool.create({...pool, ...{program: 'auction'}})
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
    transfer({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            amount: amount,
            function: 'auction.transfer',
        }})
    }

    /**
     * Deposit to auction pool
     */
    deposit({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'auction.deposit',
        }})
    }

    /**
     * Resolve auction pool
     */
    resolve(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'auction.resolve',
        }})
    }

    /**
     * Cancel auction pool
     */
    cancel(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'auction.cancel',
        }})
    }

    /**
     * Close auction pool
     */
    close(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'auction.close',
        }})
    }
}