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
    transfer(tx) {
        Models.requiredFields(tx, ['amount', 'token'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: tx.token,
            amount: tx.amount,
            function: 'swap.transfer',
        }})
    }

    /**
     * Deposit to swap pool
     */
    deposit(tx, expires?: number, unlocks?: number) {
        Models.requiredFields(tx, ['amount', 'token'])
        Models.validFormats(tx, Models.TRANSACTION)

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: tx.token,
            amount: tx.amount,
            function: 'swap.deposit',
            message: expires || unlocks ? JSON.stringify(Utils.strip({expires: expires, unlocks: unlocks})) : null,
        }})
    }

    /**
     * Supply to swap pool
     */
    supply() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'swap.supply',
        }})
    }

    /**
     * Withdraw from swap pool
     */
    withdraw(percentage: number = 1.0) {
        if (percentage > 1) throw Error('input: percentage must between zero and one')

        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'swap.withdraw',
            message: JSON.stringify({percentage: percentage})
        }})
    }
}