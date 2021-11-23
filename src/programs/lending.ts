import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Pool } from '../modules/pool'

export class Lending {
    public pool

    /**
     * Create lending pool
     */
    static create(pool) {
        Models.requiredFields(pool, ['token', 'expires'])
        Models.validFormats(pool, Models.POOL)
        return Pool.create({...pool, ...{program: 'lending'}})
    }

    /**
     * Init lending pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to lending pool
     */
    transfer({amount, collateralization=2.5}, tx={}) {
        return Instruction.wrap({
            function: 'royalty.transfer',
            pool: this.pool.address,
            amount: amount,
            collateralization: collateralization,
        }, tx)
    }

    /**
     * Settle claim from lending pool
     */
    settle({claim, amount}, tx={}) {
        return Instruction.wrap({
            function: 'royalty.settle',
            pool: this.pool.address,
            claim: claim,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Liquidate claim from lending pool
     */
    liquidate({claim}, tx={}) {
        return Instruction.wrap({
            function: 'royalty.liquidate',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Deposit to lending pool
     */
    deposit({amount, unlocks=None, expires=None}, tx={}) {
        return Instruction.wrap({
            function: 'royalty.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Withdraw from lending pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'royalty.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }
}