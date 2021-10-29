import { Config } from './config'

/**
 * Set public and private key
 * Optionally set network and interface endpoints
 */
export const connect = ({publicKey, privateKey=null, networkEndpoint=null, interfaceEndpoint=null}) => {
    Config.publicKey = publicKey
    Config.privateKey = privateKey
    if (networkEndpoint) Config.network = networkEndpoint
    if (interfaceEndpoint) Config.interface = interfaceEndpoint
}