import { Address } from './modules/address'
import { Allowance } from './modules/allowance'
import { Balance } from './modules/balance'
import { Candle } from './modules/candle'
import { Claim } from './modules/claim'
import { Credential } from './modules/credential'
import { Instruction } from './modules/instruction'
import { Lookup } from './modules/lookup'
import { Pool } from './modules/pool'
import { Resource } from './modules/resource'
import { Search } from './modules/search'
import { Statistic } from './modules/statistic'
import { Token } from './modules/token'
import { Transaction } from './modules/transaction'
import { Transfer } from './modules/transfer'

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

import { Hashed } from './library/hashed'
import { Models } from './library/models'
import { Utils } from './library/utils'
import { Wallet } from './library/wallet'
import { Config } from './library/config'

const Xeta = {
    /**
     * Modules
     */
    address: Address,
    allowance: Allowance,
    balance: Balance,
    candle: Candle,
    claim: Claim,
    credential: Credential,
    instruction: Instruction,
    lookup: Lookup,
    pool: Pool,
    resource: Resource,
    search: Search,
    statistic: Statistic,
    token: Token,
    transaction: Transaction,
    transfer: Transfer,

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
    hashed: Hashed,
    models: Models,
    utils: Utils,
    wallet: Wallet,
    config: Config,
}

export default Xeta