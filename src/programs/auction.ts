import { Instruction } from '../modules/instruction'
import { Utils } from '../library/utils'

export class Auction {
    public pool

    /**
     * Init auction pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to auction pool
     */
    transfer({amount}, tx={}) {
        return Instruction.wrap({
            function: 'auction.transfer',
            pool: this.pool.address,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Deposit to auction pool
     */
    deposit({unlocks=null, expires=null}={}, tx={}) {
        return Instruction.wrap({
            function: 'auction.deposit',
            pool: this.pool.address,
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Resolve auction pool
     */
    resolve(tx={}) {
        return Instruction.wrap({
            function: 'auction.resolve',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Cancel auction pool
     */
    cancel(tx={}) {
        return Instruction.wrap({
            function: 'auction.cancel',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Close auction pool
     */
    close(tx={}) {
        return Instruction.wrap({
            function: 'auction.close',
            pool: this.pool.address,
        }, tx)
    }
}