import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'
import { Utils } from '../library/utils'

export class Vote {
    public pool

    /**
     * Create vote pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'vote'}})
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
    transfer({amount=0, answer=null, number=null}, tx={}) {
        if ((this.pool.candidates && !answer) || (this.pool.candidates && number)) throw Error('validation: incorrect answer')

        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'vote.transfer',
            message: JSON.stringify(Utils.strip({answer: answer, number: number})),
        }})
    }

    /**
     * Claim from vote pool
     */
    claim({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'vote.claim',
        }})
    }

    /**
     * Resolve vote pool
     */
    resolve(tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            function: 'vote.resolve',
        }})
    }
}