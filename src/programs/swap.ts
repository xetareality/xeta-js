import { Instruction } from '../modules/instruction'
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
        return Instruction.wrap({
            function: 'swap.transfer',
            pool: this.pool.address,
            token: token,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Deposit to swap pool
     */
    deposit({tokenAmount, xetaAmount, unlocks=null}, tx={}) {
        return Instruction.wrap({
            function: 'swap.deposit',
            pool: this.pool.address,
            tokenAmount: Utils.amount(tokenAmount),
            xetaAmount: Utils.amount(xetaAmount),
            unlocks: unlocks,
        }, tx)
    }

    /**
     * Withdraw from swap pool
     */
    withdraw({claim, percentage=1}, tx={}) {
        if (percentage > 1) throw Error('percentage:invalid')

        return Instruction.wrap({
            function: 'swap.withdraw',
            pool: this.pool.address,
            claim: claim,
            percentage: percentage,
        }, tx)
    }
}