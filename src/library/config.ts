import Big from 'big.js'

export const Config = {
    publicKey: null,
    privateKey: null,
    seed: null,
    password: null,
    dev: null,
    interface: 'https://interface.xetareality.com',
    network: 'https://network.xetareality.com',
    xetaAddress: '11111111111111111111111111111xeta',
    factoryAddress: '11111111111111111111111111factory',
    xusdAddress: '11111111111111111111111111111xusd',
    sponsoredAddress: '1111111111111111111111111sponsored',
    consumedAddress: '11111111111111111111111111consumed',
    zeroAddress: '11111111111111111111111111111zero',
    burnAddress: '11111111111111111111111111111burn',

    /**
     * Set endpoints and environment mode
     */
    init: ({networkEndpoint=null, interfaceEndpoint=null, dev=null}) => {
        if (networkEndpoint) Config.network = networkEndpoint
        if (interfaceEndpoint) Config.interface = interfaceEndpoint
        if (dev != null) Config.dev = dev
    }
}