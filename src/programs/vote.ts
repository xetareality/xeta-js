import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

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
        if ((this.pool.candidates && !answer) || (this.pool.candidates && number)) throw Error('answer:invalid')

        return Instruction.wrap({
            function: 'vote.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            answer: answer,
            number: number,
        }, tx)
    }

    /**
     * Claim from vote pool
     */
    claim({claim}, tx={}) {
        return Instruction.wrap({
            function: 'vote.claim',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Resolve vote pool
     */
    resolve(tx={}) {
        return Instruction.wrap({
            function: 'vote.resolve',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Set accepted answer
     */
    oracle({answer}, tx={}) {
        return Instruction.wrap({
            function: 'vote.oracle',
            pool: this.pool.address,
            answer: answer,
        }, tx)
    }
}