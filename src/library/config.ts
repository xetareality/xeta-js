import Big from 'big.js'

export const Config = {
    publicKey: null,
    privateKey: null,
    seed: null,
    password: null,
    interface: 'https://interface.xetareality.com',
    network: 'https://mainnet.xetareality.com',
    registry: 'https://registry.xetareality.com',
    xetaAddress: '11111111111111111111111111111xeta',
    factoryAddress: '11111111111111111111111111factory',
    xusdAddress: '11111111111111111111111111111xusd',
    sponsoredAddress: '1111111111111111111111111sponsored',
    consumedAddress: '11111111111111111111111111consumed',
    zeroAddress: '11111111111111111111111111111zero',
    burnAddress: '11111111111111111111111111111burn',
}

export const Constants = {
    zero: Big(0),
    one: Big(1),
}