import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Address = {
    /**
     * Read address data (balance, profile, pool, token)
     */
    read: async ({address, fetch=null}) => {
        var params = new URLSearchParams({address: address, dev: Config.dev} as any).toString()

        var result = (fetch || $fetch)(Config.interface+'/address?'+params).catch(e => {
            throw Error(e.data)
        })

        var data = fetch ? await result.json() : result
        return {balance: result.balance, profile: result.profile, pool: result.pool, token: result.token}
    },
}