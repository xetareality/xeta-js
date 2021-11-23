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
        return Pool.create({...pool, ...{program: 'royalty'}})
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
    transfer({token}, tx={}) {
        this.claim({token}, tx)
    }

    /**
     * Claim from royalty pool
     */
    claim({token}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: token,
            function: 'royalty.claim',
        }})
    }

    /**
     * Deposit to royalty pool
     */
    deposit({amount, expires=null, unlocks=null}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'royalty.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Withdraw from royalty pool
     */
    withdraw({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'royalty.withdraw',
        }})
    }

    /**
     * Close royalty pool
     */
    close(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'royalty.close',
        }})
    }
}