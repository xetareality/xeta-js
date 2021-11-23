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
        return Pool.create({...pool, ...{program: 'staking'}})
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
    transfer({amount, expires=null, unlocks=null}, tx={}) {
        if (unlocks && unlocks < Date.now()+24*60*60*1000) throw Error('validation: below minimum time')

        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'staking.transfer',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Claim from staking pool
     */
    claim({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'staking.claim',
        }})
    }

    /**
     * Deposit to staking pool
     */
    deposit({amount, expires=null, unlocks=null}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'staking.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Withdraw from staking pool
     */
    withdraw({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'staking.withdraw',
        }})
    }
}