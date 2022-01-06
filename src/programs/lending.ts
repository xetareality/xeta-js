import { Instruction } from '../modules/instruction'
import { Utils } from '../library/utils'

export class Lending {
    public pool

    /**
     * Init lending pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to lending pool
     */
    transfer({amount, collateralization}, tx={}) {
        return Instruction.wrap({
            function: 'lending.transfer',
            pool: this.pool.address,
            token: this.pool.token,
            amount: Utils.amount(amount),
            collateralization: collateralization,
        }, tx)
    }

    /**
     * Settle claim from lending pool
     */
    settle({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lending.settle',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Liquidate claim from lending pool
     */
    liquidate({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lending.liquidate',
            pool: this.pool.address,
            token: this.pool.token,
            claim: claim,
        }, tx)
    }

    /**
     * Deposit to lending pool
     */
    deposit({amount, unlocks=null}, tx={}) {
        return Instruction.wrap({
            function: 'lending.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
        }, tx)
    }

    /**
     * Withdraw from lending pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lending.withdraw',
            pool: this.pool.address,
            token: this.pool.token,
            claim: claim,
        }, tx)
    }
}