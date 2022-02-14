import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Address = {
    /**
     * Read address data (balance, profile, pool, token)
     */
    read: async ({address, fetch=null}) => {
        var params = new URLSearchParams({address: address, dev: Config.dev} as any).toString()

        return (fetch || $fetch)(Config.interface+'/address?'+params).catch(e => {
            throw Error(e.data)
        })
    },
}