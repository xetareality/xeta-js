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
        return Pool.create({...pool, ...{program: 'lock'}}, {token: pool.token})
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
    transfer(tx, expires?: number, unlocks?: number, address?: string) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'lock.transfer',
            message: expires || unlocks || address ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks, address: address})) : null,
        }})
    }

    /**
     * Claim from lock pool
     */
    claim() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'lock.claim',
        }})
    }
}