import { Address } from './modules/address'
import { Allowance } from './modules/allowance'
import { Audit } from './modules/audit'
import { Balance } from './modules/balance'
import { Candle } from './modules/candle'
import { Claim } from './modules/claim'
import { Credentials } from './modules/credentials'
import { Pool } from './modules/pool'
import { Statistic } from './modules/statistic'
import { Token } from './modules/token'
import { Transaction } from './modules/transaction'

import { Auction } from './programs/auction'
import { Launch } from './programs/launch'
import { Lock } from './programs/lock'
import { Loot } from './programs/loot'
import { Lottery } from './programs/lottery'
import { Royalty } from './programs/royalty'
import { Staking } from './programs/staking'
import { Swap } from './programs/swap'
import { Vote } from './programs/vote'

import { Hashing } from './library/hashing'
import { Models } from './library/models'
import { Utils } from './library/utils'
import { Wallet } from './library/wallet'
import { Config } from './library/config'
import { connect } from './library/methods'

export const Xeta = {
    /**
     * Modules
     */
    address: Address,
    allowance: Allowance,
    audit: Audit,
    balance: Balance,
    candle: Candle,
    claim: Claim,
    credentials: Credentials,
    pool: Pool,
    statistic: Statistic,
    token: Token,
    transaction: Transaction,

    /**
     * Programs
     */
    auction: Auction,
    launch: Launch,
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
    hashing: Hashing,
    models: Models,
    utils: Utils,
    wallet: Wallet,
    config: Config,
    connect: connect,
}