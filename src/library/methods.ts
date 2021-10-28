import { Config } from './config'

/**
 * Set public and private key
 * Optionally set network and interface endpoints
 */
export const connect = (publicKey: string, privateKey?: string, networkEndpoint?: string, interfaceEndpoint?: string): void => {
    Config.publicKey = publicKey
    Config.privateKey = privateKey
    if (networkEndpoint) Config.network = networkEndpoint
    if (interfaceEndpoint) Config.interface = interfaceEndpoint

    // var updates: any = {}
    // updates.publicKey = publicKey
    // updates.privateKey = privateKey
    // if (networkEndpoint) updates.network = networkEndpoint
    // if (interfaceEndpoint) updates.interface = interfaceEndpoint
    // Config.update(updates)
}