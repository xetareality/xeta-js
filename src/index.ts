import { Address } from './modules/address'
import { Allowance } from './modules/allowance'
import { Balance } from './modules/balance'
import { Candle } from './modules/candle'
import { Claim } from './modules/claim'
import { Instruction } from './modules/instruction'
import { Pool } from './modules/pool'
import { Profile } from './modules/profile'
import { Registry } from './modules/registry'
import { Resource } from './modules/resource'
import { Search } from './modules/search'
import { Statistic } from './modules/statistic'
import { Token } from './modules/token'
import { Transaction } from './modules/transaction'
import { Transfer } from './modules/transfer'
import { Wallet } from './modules/wallet'

import { Auction } from './programs/auction'
import { Launch } from './programs/launch'
import { Lending } from './programs/lending'
import { Lock } from './programs/lock'
import { Loot } from './programs/loot'
import { Lottery } from './programs/lottery'
import { Royalty } from './programs/royalty'
import { Staking } from './programs/staking'
import { Swap } from './programs/swap'
import { Vote } from './programs/vote'

import { Config } from './library/config'
import { Crypto } from './library/crypto'
import { Hash } from './library/hash'
import { Models } from './library/models'
import { Utils } from './library/utils'

const Xeta = {
    /**
     * Modules
     */
    address: Address,
    allowance: Allowance,
    balance: Balance,
    candle: Candle,
    claim: Claim,
    instruction: Instruction,
    pool: Pool,
    profile: Profile,
    registry: Registry,
    resource: Resource,
    search: Search,
    statistic: Statistic,
    token: Token,
    transaction: Transaction,
    transfer: Transfer,
    wallet: Wallet,

    /**
     * Programs
     */
    auction: Auction,
    launch: Launch,
    lending: Lending,
    lock: Lock,
    loot: Loot,
    lottery: Lottery,
    royalty: Royalty,
    staking: Staking,
    swap: Swap,
    vote: Vote,

    /**
     * Library
     */
    config: Config,
    crypto: Crypto,
    hash: Hash,
    models: Models,
    utils: Utils,
};

export default Xeta