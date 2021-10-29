import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'
import { Utils } from '../library/utils'

export class Swap {
    public pool

    /**
     * Init swap pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to swap pool
     */
    transfer({token, amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: token,
            amount: amount,
            function: 'swap.transfer',
        }})
    }

    /**
     * Deposit to swap pool
     */
    deposit({token, amount, expires=null, unlocks=null}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: token,
            amount: amount,
            function: 'swap.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Supply to swap pool
     */
    supply(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'swap.supply',
        }})
    }

    /**
     * Withdraw from swap pool
     */
    withdraw({percentage=1}) {
        if (percentage > 1) throw Error('input: percentage must between zero and one')

        return Transaction.create({
            to: this.pool.address,
            function: 'swap.withdraw',
            message: JSON.stringify({percentage: percentage})
        })
    }
}