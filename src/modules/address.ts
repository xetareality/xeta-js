import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Address = {
    /**
     * Read address data (balance, profile, pool, token)
     */
    read: async ({address}) => {
        var result = await $fetch(Config.interface+'/address', {
            method: 'GET',
            params: {address: address, dev: Config.dev},
        }).catch(e => {
            throw Error(e.data)
        })

        return {balance: result.balance, profile: result.profile, pool: result.pool, token: result.token}
    },
}