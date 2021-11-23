import { Transaction } from '../modules/transaction'
import { Pool } from '../modules/pool'
import { Config } from '../library/config'
import { Models } from '../library/models'

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
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: Config.xetaAddress,
            amount: amount,
            message: JSON.stringify({collateralization: collateralization}),
            function: 'lending.transfer',
        }})
    }

    /**
     * Settle claim from lending pool
     */
    settle({claim, amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            message: JSON.stringify({token: claim}),
            function: 'lending.settle',
        }})
    }

    /**
     * Liquidate claim from lending pool
     */
    liquidate({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            message: JSON.stringify({token: claim}),
            function: 'lending.liquidate',
        }})
    }

    /**
     * Deposit to lending pool
     */
    deposit({amount}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: this.pool.token,
            amount: amount,
            function: 'lending.deposit',
        }})
    }

    /**
     * Withdraw from lending pool
     */
    withdraw({claim}, tx={}) {
        return Transaction.create({...tx, ...{
            to: this.pool.address,
            token: claim,
            function: 'lending.withdraw',
        }})
    }