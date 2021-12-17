# Official JavaScript Client for Xeta

Official JavaScript client to interact with Xeta Blockchain and Xeta Blockchain Interface.

Xeta is a serverless layer-1 blockchain for Metaverse, Gaming, and NFT applications that provides infinite scalability, high throughput, sub-second confirmation times, and fees at a tenth of a cent. Xeta achieves this by leveraging serverless compute and storage cloud services while innovating incentive structures and extending the Byzantine Fault Tolerance consensus mechanism for scalability.

# General

Install Xeta through npm, import it, generate a public/private key (or use your existing ones) and start building using the examples below.

```
# Installation
npm install xeta-js

# Imports
import Xeta from 'xeta-js' // ESM
const Xeta = require('xeta-js') // CJS

# Generate and connect a keypair
const keypair = Xeta.crypto.generateKeypair()
Xeta.wallet.init({publicKey: keypair[0], privateKey: keypair[1]})
```

# Interface

The interface methods allow to interact with storage nodes for read-only functionality. Using these methods, you could build a similar frontend app like our [**network explorer**](https://xeta.network). Interface requests are free, but rate-limited and should allow for "regular" usage. Please contact us at developers@xetareality.com if you would like to have dedicated limits.

## Transaction

```
Xeta.transaction.poll({hash: hash, interval: number, timeout: number})
Xeta.transaction.read({hash: hash})
Xeta.transaction.list({hashes=[hash])
Xeta.transaction.scanSenderCreated({sender: address})
Xeta.transaction.scanPeriodCreated({period: period})
```

## Transfer

```
Xeta.transfer.read({hash: hash})
Xeta.transfer.list({hashes=[hash])
Xeta.transfer.scanSenderCreated({sender: address})
Xeta.transfer.scanFromCreated({fromAddress: address})
Xeta.transfer.scanToCreated({to: address})
Xeta.transfer.scanTokenCreated({token: token})
Xeta.transfer.scanFromTokenCreated({fromAddress: address, token: token})
Xeta.transfer.scanToTokenCreated({to: address, token: token})
```

## Token

```
Xeta.token.read({address: token})
Xeta.token.list({addresses=[token])
Xeta.token.scanCreatorCreated({creator: address})
Xeta.token.scanNameCreated({name: string})
Xeta.token.scanSymbolCreated({symbol: string})
Xeta.token.scanOwnerCreated({owner: address})
Xeta.token.scanContentCreated({content: hash})
Xeta.token.scanOwnerCategoryCreated({owner: address, category: string})
Xeta.token.scanCreatorCategoryCreated({creator: address, category: string})
```

## Pool

```
Xeta.pool.instance({address: pool})
Xeta.pool.read({address: pool})
Xeta.pool.list({addresses=[pool])
Xeta.pool.scanTokenProgramCreated({token: token, program: string})
Xeta.pool.scanNameCreated({name: string})
Xeta.pool.scanCreatorCreated({creator: address})
Xeta.pool.scanProgramCreated({program: string})
Xeta.pool.scanProgramExpires({program: string})
Xeta.pool.scanProgramNumber({program: string})
Xeta.pool.scanProgramXetaBalance({program: string})
Xeta.pool.scanProgramTokenBalance({program: string})
Xeta.pool.scanProgramTransfersCount({program: string})
```

## Account

```
Xeta.account.read({address: address})
```

## Allowance

```
Xeta.allowance.read({hash: hash})
Xeta.allowance.list({hashes=[hash])
Xeta.allowance.readAddressSpenderToken({address: address, spender: address, token: token})
Xeta.allowance.scanAddressCreated({address: address})
Xeta.allowance.scanSpenderCreated({spender: address})
```

## Balance

```
Xeta.balance.read({hash: hash})
Xeta.balance.list({hashes=[hash])
Xeta.balance.readAddressToken({address: address, token: token})
Xeta.balance.scanAddressAmount({address: address})
Xeta.balance.scanTokenAmount({token: token})
```

## Candle

```
Xeta.candle.read({interval: interval, token: token, time: time})
Xeta.candle.scanIntervalTokenTime({interval: interval, token: token})
Xeta.candle.scanIntervalTimeTurnover({interval: interval})
Xeta.candle.scanIntervalTimeChange({interval: interval})
```

## Claim

```
Xeta.claim.read({hash: hash})
Xeta.claim.list({hashes=[hash])
Xeta.claim.scanHolderCategoryCreated({holder: address, category: string})
Xeta.claim.scanIssuerCategoryCreated({issuer: address, category: string})
Xeta.claim.scanIssuerAnswer({issuer: address})
Xeta.claim.scanIssuerNumber({issuer: address})
Xeta.claim.scanIssuerTokenAmount({issuer: address})
Xeta.claim.scanIssuerXetaAmount({issuer: address})
Xeta.claim.scanIssuerCreated({issuer: address})
Xeta.claim.scanHolderCreated({holder: address})
Xeta.claim.scanIssuerTokenCreated({issuer: address, token: token})
Xeta.claim.scanHolderTokenCreated({holder: address, token: token})
Xeta.claim.scanIssuerHolder({issuer: address, holder: address})
Xeta.claim.scanIssuerHolderToken({issuer: address, holder: address, token: token})
```

## Registry

```
Xeta.registry.read({hash: hash})
Xeta.registry.list({hashes=[hash])
Xeta.registry.scanContentCreated({content: string})
Xeta.registry.scanFingerprintCreated({fingerprint: string})
Xeta.registry.scanClusterCreated({cluster: string})
```

## Search

```
Xeta.search.query({query: string})
```

## Statistic

```
Xeta.statistic.read({key: key, time: time})
Xeta.statistic.scan({key: key})
```

## Wallet

```
Xeta.wallet.init({publicKey: hash, privateKey: hash})
Xeta.wallet.managed({account: string, secret: string, unsafe: boolean, create: boolean})
Xeta.credentials.sign({account: string, secret: string, tx: transaction})
```

# Modules

Modules are wrapper methods that submit transactions to the network endpoint. Fees for methods are fixed and most recent fees can be found on [docs.xetareality.com](https://docs.xetareality.com). 


## Transfer

```
Xeta.transfer.create({to: address, token: token, amount: amount, fromAddress: address})
```

## Token

```
Xeta.token.create({name: string, description: string, links=[string], meta: object, icon: url, owner: address, frozen: boolean, category: string, object: url, mime: string, content: string})
Xeta.token.create({name: string, symbol: string, supply: amount, reserve: amount, description: string, links=[string], meta: object, icon: url})
```

## Pool

For pool creation, it is recommended to use the program-specific methods (which are wrappers around this method). Available pool programs are auction, launch, lock, loot, lottery, royalty, staking, swap, vote.

```
Xeta.pool.create({token: token, program: string, expires: timestamp})
```

## Claim
```
Xeta.claim.create({owner: address, token: token, tokenAmount: amount, expires: timestamp})
Xeta.claim.update({claim: claim, tokenAmount: amount})
Xeta.claim.transfer({claim: claim, to: address})
Xeta.claim.resolve({claim: claim})
```

## Account

```
Xeta.account.update({name: string, description: string, links=[string], meta: object, icon: url, category: string})
```

## Allowance

```
Xeta.allowance.update({token: token, spender: spender, amount: amount})
```

## Transaction
Approx. 10 instructions can be batched into one request. The exact number depends on reads & writes, and sub-calls made by each instruction. It is required that all instructions have the tx=false flag, to be returned as instruction object. Batch instructions are processed atomically, meaning that if one instruction fails, the transaction throws an error and no instruction is processed.

```
Xeta.transaction.submit([
    Xeta.transfer.create({to: address, token: token, amount: amount}, false),
    Xeta.transfer.create({to: address, token: token, amount: amount}, false),
    Xeta.token.create({name: string, symbol: string, supply: amount}, false),
    Xeta.token.create({name: string}, false),
    Xeta.token.create({name: string}, false),
])
```

# Programs

Pools are based on programs, which are pre-written smart contracts on Xeta. For further details on individual functionalities or requirements check out the [Xeta Reality Docs](https://docs.xetareality.com). To get the pool object from pool-address, use the Xeta.pool.instance interface method.

## Auction

```
# Creator methods:
auction = Xeta.pool.create({program='auction', token: token, expires: timestamp, xetaTarget: amount, xetaLimit: amount})
auction.deposit()
auction.close()

# Participant methods:
auction.transfer({amount: amount})
auction.resolve()
auction.cancel()
```

## Launch

```
# Creator methods:
launch = Xeta.pool.create({program='launch', token: token, expires: timestamp, xetaTarget: amount, xetaLimit: amount})
launch.deposit({amount: amount})
launch.withdraw({claim: claim})
launch.close()

# Participant methods:
launch.resolve()
launch.transfer({amount: amount})
launch.swap({amount: amount})
launch.claim({claim: claim})
```

## Lending

```
# Creator methods:
lending = Xeta.pool.create({program='lending', token: token})
lending.deposit({amount: amount})
lending.withdraw({claim: claim})

# Participant methods:
lending.liquidate({claim: claim})
lending.transfer({amount: amount, collateralization: number})
lending.settle({claim: claim})
```

## Lock

```
# Creator methods:
lock = Xeta.pool.create({program='lock', token: token, expires: timestamp})

# Participant methods:
lock.transfer({amount: amount, unlocks: timestamp, address: address})
lock.claim({claim: claim})
```

## Loot

```
# Creator methods:
loot = Xeta.pool.create({program='loot', token: token, probability: number, minAmount: amount, maxAmount: amount})
loot.deposit({token: token})
loot.withdraw({claim: claim})
loot.clear()

# Participant methods:
loot.transfer()
```

## Lottery

```
# Creator methods:
lottery = Xeta.pool.create({program='lottery', token: token, expires: timestamp, claimsLimit: integer, transfersLimit: integer})
lottery.deposit({amount: amount})
lottery.withdraw({claim: claim})
lottery.close()
lottery.clear()

# Participant methods:
lottery.transfer({amount: amount})
lottery.claim({claim: claim})
lottery.resolve()
```

## Royalty

```
# Creator methods:
royalty = Xeta.pool.create({program='royalty', token: token, rate: number})
royalty.deposit({amount: amount})
royalty.withdraw({claim: claim})
royalty.close()

# Participant methods:
royalty.transfer({token: token})
royalty.claim({token: token})
```

## Staking

```
# Creator methods:
staking = Xeta.pool.create({program='staking', token: token, rate: number, percentage: number, minTime: integer, maxTime: integer, minAmount: amount, maxAmount: amount})
staking.deposit({amount: amount})
staking.withdraw({claim: claim})

# Participate methods:
staking.transfer({amount: amount, unlocks: timestamp})
staking.claim({claim: claim})
```

## Swap

Swap pools are automatically created for all fungible tokens, with the same pool-address as the token-address.

```
# Liquidity provider methods:
swap.deposit({tokenAmount: amount, xetaAmount: amount, unlocks: timestamp})
swap.withdraw({claim: claim, percentage: number})

# Participant methods:
swap.transfer({token: token, amount: amount})
```

## Vote

```
# Creator methods:
vote = Xeta.pool.create({program='vote', token: token, expires: timestamp, mechanism: string, maxAmount: amount, candidates=[string])
Xeta.vote.oracle({answer: answer})

# Participant methods:
vote.transfer({amount: amount, answer: string, number: number})
vote.resolve()
vote.claim({claim: claim})
```

# Feedback & Contributions

We encourage contributions to this library. Please also join our social channels in case you have suggestions or require technical help.

[**Website**](https://xetareality.com)
[**App**](https://xeta.network)
[**Twitter**](https://twitter.com/XetaReality)
[**Telegram**](https://t.me/XetaReality)