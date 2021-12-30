import { Instruction } from '../modules/instruction'
import { Utils } from '../library/utils'

export class Loot {
    public pool

    /**
     * Init loot pool
     */
    constructor(pool) {
        this.pool = pool
    }

    /**
     * Transfer to loot pool
     */
    transfer(tx={}) {
        return Instruction.wrap({
            function: 'loot.transfer',
            pool: this.pool.address,
        }, tx)
    }

    /**
     * Deposit to loot pool
     */
    deposit({token, unlocks=null}, tx={}) {
        return Instruction.wrap({
            function: 'loot.deposit',
            pool: this.pool.address,
            token: token,
            unlocks: unlocks,
        }, tx)
    }

    /**
     * Withdraw from loot pool
     */
    withdraw({claim}, tx={}) {
        return Instruction.wrap({
            function: 'loot.withdraw',
            pool: this.pool.address,
            claim: claim,
        }, tx)
    }

    /**
     * Clear loot pool
     */
    clear(tx={}) {
        return Instruction.wrap({
            function: 'loot.clear',
            pool: this.pool.address,
        }, tx)
    }
}