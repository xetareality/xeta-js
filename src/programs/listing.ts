import { Instruction } from '../modules/instruction'
import { Utils } from '../library/utils'

export class Listing {
    public pool

    /**
     * Init listing pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to listing pool
     */
    transfer({amount}, tx={}) {
        return Instruction.wrap({
            function: 'listing.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Deposit to listing pool
     */
    deposit({amount=null, unlocks=null}, tx={}) {
        return Instruction.wrap({
            function: 'listing.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
        }, tx)
    }

    /**
     * Close listing pool
     */
    close(tx={}) {
        return Instruction.wrap({
            function: 'listing.close',
            pool: this.pool.address,
        }, tx)
    }
}