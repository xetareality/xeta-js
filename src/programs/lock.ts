import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'
import { Utils } from '../library/utils'

export class Lock {
    public pool

    /**
     * Create lock pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'lock'}})
    }

    /**
     * Init lock pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to lock pool
     */
    transfer({amount, expires=null, unlocks=null, address=null}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'lock.transfer',
            message: expires || unlocks || address ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks, address: address})) : null,
        }})
    }

    /**
     * Claim from lock pool
     */
    claim(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'lock.claim',
        }})
    }
}