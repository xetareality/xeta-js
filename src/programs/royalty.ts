import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'
import { Utils } from '../library/utils'

export class Royalty {
    public pool

    /**
     * Create royalty pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'royalty'}}, {token: pool.token})
    }

    /**
     * Init royalty pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to royalty pool
     */
    transfer(tx) {
        this.claim(tx)
    }

    /**
     * Claim from royalty pool
     */
    claim(tx) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: tx.token,
            function: 'royalty.claim',
        }})
    }

    /**
     * Deposit to royalty pool
     */
    deposit(tx, expires?: number, unlocks?: number) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'royalty.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Withdraw from royalty pool
     */
    withdraw() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'royalty.withdraw',
        }})
    }

    /**
     * Close royalty pool
     */
    close() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'royalty.close',
        }})
    }
}