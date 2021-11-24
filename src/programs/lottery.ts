import { Instruction } from '../modules/instruction'
import { Utils } from '../library/utils'

export class Lottery {
    public pool

    /**
     * Init lottery pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to lottery pool
     */
    transfer({amount}, tx={}) {
        return Instruction.wrap({
            function: 'lottery.transfer',
            pool: this.pool.address,
            token: this.pool.token,
            amount: Utils.amount(amount),
        }, tx)
    }

    /**
     * Claim from lottery pool
     */
    claim({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lottery.claim',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Resolve NFT lottery pool
     */
    resolve(tx={}) {
        return Instruction.wrap({
            function: 'lottery.resolve',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Deposit to lottery pool
     */
    deposit({amount=null, unlocks=null, expires=null}={}, tx={}) {
        return Instruction.wrap({
            function: 'lottery.deposit',
            pool: this.pool.address,
            amount: Utils.amount(amount),
            unlocks: unlocks,
            expires: expires,
        }, tx)
    }

    /**
     * Withdraw from lottery pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'lottery.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Close lottery pool
     */
    close(tx={}) {
        return Instruction.wrap({
            function: 'lottery.close',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Clear lottery pool
     */
    clear(tx={}) {
        return Instruction.wrap({
            function: 'lottery.clear',
            pool: this.pool.address,
        }, tx)
    }
}