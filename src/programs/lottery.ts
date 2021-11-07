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
        return Pool.create({...pool, ...{program: 'lottery'}})
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
    transfer({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            amount: amount,
            function: 'lottery.transfer',
        }})
    }

    /**
     * Claim from lottery pool
     */
    claim({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'lottery.claim',
        }})
    }

    /**
     * Deposit to lottery pool
     */
    deposit({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'lottery.deposit',
        }})
    }

    /**
     * Withdraw from lottery pool
     */
    withdraw({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'lottery.withdraw',
        }})
    }

    /**
     * Close lottery pool
     */
    close(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'lottery.close',
        }})
    }

    /**
     * Clear lottery pool
     */
    clear(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'lottery.clear',
        }})
    }
}