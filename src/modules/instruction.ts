import { Utils } from '../library/utils'
import { Transaction } from './transaction'

export const Instruction = {
    /**
     * Wrap arguments as instruction
     * Submit instruction as transaction
     * Or return instruction if submit is false
     */
    wrap: async (args, tx={}) => {
        var instruction = Utils.strip(args)
        if (!tx) return instruction
        return Transaction.submit([instruction], tx)
    },
}
