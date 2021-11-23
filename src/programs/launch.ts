import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

export class Launch {
    public pool

    /**
     * Create launch pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token', 'expires'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'launch'}})
    }

    /**
     * Init launch pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to launch pool
     */
    transfer({amount}, tx={}) {
        return Instruction.wrap({
            function: 'launch.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Swap via launch pool
     */
    swap({amount}, tx={}) {
        return Instruction.wrap({
            function: 'launch.swap',
            pool: this.pool.address,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Resolve launch pool
     */
    resolve(tx={}) {
        return Instruction.wrap({
            function: 'launch.resolve',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Claim from launch pool
     */
    claim({claim}, tx={}) {
        return Instruction.wrap({
            function: 'launch.claim',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Deposit to launch pool
     */
    deposit({amount, unlocks=null, expires=null}, tx={}) {
        return Instruction.wrap({
            function: 'launch.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Withdraw from launch pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'launch.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Close launch pool
     */
    close(tx={}) {
        return Instruction.wrap({
            function: 'launch.close',
            pool: this.pool.address,
        }, tx)
    }
}