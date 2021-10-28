import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

export class Vote {
    public pool

    /**
     * Create vote pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'vote'}}, {token: pool.token})
    }

    /**
     * Init vote pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to vote pool
     */
    transfer(tx, answer?: string, number?: number) {
        Models.requiredFields(tx, ['amount'])
        Models.validFormats(tx, Models.TRANSACTION)

        if ((this.pool.candidates && !answer) || (this.pool.candidates && number)) throw Error('validation: incorrect answer')

        return Transaction.create({...Transaction.template(), ...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: tx.amount,
            function: 'vote.transfer',
            message: answer ? JSON.stringify({answer: answer}) : number ? JSON.stringify({number: number}) : null,
        }})
    }

    /**
     * Claim from vote pool
     */
    claim() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'vote.claim',
        }})
    }

    /**
     * Resolve vote pool
     */
    resolve() {
        return Transaction.create({...Transaction.template(), ...{
            to: this.pool.address,
            function: 'vote.resolve',
        }})
    }
}