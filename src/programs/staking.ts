import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'
import { Utils } from '../library/utils'

export class Staking {
    public pool

    /**
     * Create staking pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'staking'}}, {token: pool.token})
    }

    /**
     * Init staking pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to staking pool
     */
    transfer(tx, expires?: number, unlocks?: number) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        if (unlocks && unlocks < Date.now()+24*60*60*1000) throw Error('validation: below minimum time')

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'staking.transfer',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Claim from staking pool
     */
    claim() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'staking.claim',
        }})
    }

    /**
     * Deposit to staking pool
     */
    deposit(tx, expires?: number, unlocks?: number) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'staking.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Withdraw from staking pool
     */
    withdraw() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'staking.withdraw',
        }})
    }
}