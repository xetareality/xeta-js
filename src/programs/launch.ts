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
        return Pool.create({...pool, ...{program: 'launch'}})
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
    transfer({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            amount: amount,
            function: 'launch.transfer',
        }})
    }

    /**
     * Swap via launch pool
     */
    swap({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            amount: amount,
            function: 'launch.swap',
        }})
    }

    /**
     * Resolve launch pool
     */
    resolve(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'launch.resolve',
        }})
    }

    /**
     * Claim from launch pool
     */
    claim({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'launch.claim',
        }})
    }

    /**
     * Deposit to launch pool
     */
    deposit({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'launch.deposit',
        }})
    }

    /**
     * Withdraw from launch pool
     */
    withdraw({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'launch.withdraw',
        }})
    }

    /**
     * Close launch pool
     */
    close(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'launch.close',
        }})
    }
}