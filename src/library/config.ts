// import { Utils } from './utils'
import Big from 'big.js'

export const Config = {
    publicKey: null,
    privateKey: null,
    interface: 'https://interface.xetareality.com',
    network: 'https://mainnet.xetareality.com',
    zeroAddress: '11111111111111111111111111111zero',
    xetaAddress: '11111111111111111111111111111xeta',
    factoryAddress: '11111111111111111111111111factory',
    xusdAddress: '11111111111111111111111111111xusd',
    sponsoredAddress: '1111111111111111111111111sponsored',
    consumedAddress: '11111111111111111111111111consumed',
    batchAddress: '1111111111111111111111111111batch',
}

export const Constants = {
    zero: Big(0),
    one: Big(1),
}

// export const Config = {
//     template: {
//         publicKey: null,
//         privateKey: null,
//         interface: 'https://interface.xetareality.com',
//         network: 'https://mainnet.xetareality.com',
//         zeroAddress: '11111111111111111111111111111zero',
//         xetaAddress: '11111111111111111111111111111xeta',
//         factoryAddress: '11111111111111111111111111factory',
//         xusdAddress: '11111111111111111111111111111xusd',
//         sponsoredAddress: '1111111111111111111111111sponsored',
//         consumedAddress: '11111111111111111111111111consumed',
//         batchAddress: '1111111111111111111111111111batch',
//     },
//     update: (updates: object): object => {
//         var existing = Utils.global().config ? Utils.global().config : Config.template
//         Utils.global().config = {...existing, ...updates}
//         return Config.get()
//     },
//     get: (): any => {
//         return Utils.global().config ? Utils.global().config : Config.template
//     }
// }