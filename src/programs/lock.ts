import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

export class Lock {
    public pool

    /**
     * Create lock pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'lock'}})
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
    transfer({amount, unlocks=null, expires=null, address=null}, tx={}) {
        return Instruction.wrap({
            function: 'lock.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
            address: address,
        }, tx)
    }

    /**
     * Claim from lock pool
     */
    claim({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lock.claim',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }
}