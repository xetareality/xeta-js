# Official JavaScript Client for Xeta

Official JavaScript client to interact with Xeta Blockchain and Xeta Blockchain Interface.

Xeta is a serverless layer-1 blockchain for Metaverse, Gaming, and NFT applications that provides infinite scalability, high throughput, sub-second confirmation times, and fees at a tenth of a cent. Xeta achieves this by leveraging serverless compute and storage cloud services while innovating incentive structures and extending the Byzantine Fault Tolerance consensus mechanism for scalability.

# General

Install Xeta through npm, import it, generate a public/private key (or use your existing ones) and start building using the examples below.

```
# Installation
npm install xeta-js

# Imports
import Xeta from 'xeta-js'

# Generate and connect a keypair
public, private = Xeta.wallet.generateKeypair()
Xeta.connect({publicKey: public, privateKey: private})
```

# Interface

The interface methods allow to interact with storage nodes for read-only functionality. Using these methods, you could build a similar frontend app like our [**network explorer**](https://xeta.network). Interface requests are free, but rate-limited and should allow for "regular" usage. Please contact us at developers@xetareality.com if you would like to have dedicated limits.

## Transaction

```
# Get a transaction by signature
Xeta.transaction.get({signature: SIGNATURE})

# Batch get transactions by signatures
Xeta.transaction.batchGet({signatures: [SIGNATURE, SIGNATURE]})

# Poll a transaction by signature
Xeta.transaction.poll({signature: SIGNATURE, interval: 0.5, timeout: 5})

# Scan transactions by from-address
Xeta.transaction.scanByFrom({from_address: ADDRESS, sort: 'DESC', limit: 25})

# Scan transactions by to-address
Xeta.transaction.scanByTo({to: ADDRESS, sort: 'DESC', limit: 25})

# Scan transactions by sender-address
Xeta.transaction.scanBySender({sender: ADDRESS, sort: 'DESC', limit: 25})

# Scan transactions by token
Xeta.transaction.scanByToken({token: ADDRESS, sort: 'DESC', limit: 25})

# Scan transactions by period
Xeta.transaction.scanByPeriod({period: YYMMDDHH, sort: 'DESC', limit: 25})

# Scan transactions by from and token
Xeta.transaction.scanByFromToken({from_address: ADDRESS, token: ADDRESS, sort: 'DESC', limit: 25})

# Scan transactions by to and token
Xeta.transaction.scanByToToken({to: ADDRESS, token: ADDRESS, sort: 'DESC', limit: 25})
```

## Token

```
# Get a token by address
Xeta.token.get({address: ADDRESS})

# Batch get tokens by addresses
Xeta.token.batchGet({signatures: [SIGNATURE, SIGNATURE]})

# Scan tokens by creator
Xeta.token.scanByCreator({creator: ADDRESS, sort: 'DESC', limit: 25})

# Scan tokens by ticker
Xeta.token.scanByTicker({ticker: 'XETA', sort: 'DESC', limit: 25})

# Scan tokens by name
Xeta.token.scanByName({name'Xeta', sort: 'DESC', limit: 25})
```

## Pool

```
# Get a pool by address
Xeta.pool.get({address: ADDRESS})

# Scan pools by creator
Xeta.pool.scanByCreator({creator: ADDRESS, sort: 'DESC', limit: 25})

# Scan pools by token
Xeta.pool.scanByToken({token: ADDRESS, sort: 'DESC', limit: 25})

# Scan pools by name
Xeta.pool.scanByName({name'Xeta Staking', sort: 'DESC', limit: 25})
```

## Allowance

```
# Get an allowance for address, token and spender
Xeta.allowance.get({address: ADDRESS, token: ADDRESS, spender: ADDRESS})

# Get an allowance by hash
Xeta.allowance.getByHash({hash: HASH})

# Scan allowances by address
Xeta.allowance.scanByAddress({address: ADDRESS, sort: 'DESC', limit: 25})

# Scan allowances by spender
Xeta.allowance.scanBySpender({spender: ADDRESS, sort: 'DESC', limit: 25})
```

## Audit

```
# Get an audit of a token-balance
Xeta.audit.balance({address: ADDRESS, token: ADDRESS, limit: 5})

# Get an audit of a xeta-balance
Xeta.audit.xeta({address: ADDRESS, limit: 5})

# Get an audit of a transaction
Xeta.audit.transaction({signature: SIGNATURE})

```

## Balance

```
# Get a balance by address and token
Xeta.balance.get({address: ADDRESS, token: ADDRESS})

# Scan balances by address
Xeta.balance.scanByAddress({address: ADDRESS, sort: 'DESC', limit: 25})

# Scan balances by token
Xeta.balance.scanByToken({token: ADDRESS, sort: 'DESC', limit: 25})
```

## Candle

```
# Scan candles by token and interval (currently available: 5m, 1h, 4h, 1d, 1w)
Xeta.candle.scan({token: ADDRESS, interval: INTERVAL, sort: 'DESC', limit: 100})
```

## Claim

```
# Get a claim by address, token and owner
Xeta.claim.get({address: ADDRESS, token: ADDRESS, owner: ADDRESS})

# Get a claim by hash
Xeta.claim.getByHash({hash: HASH, sort: 'DESC', limit: 25})

# Scan claims by amount
Xeta.claim.scanByAmount({owner: ADDRESS, sort: 'DESC', limit: 25})

# Scan claims by created
Xeta.claim.scanByCreated({owner: ADDRESS, sort: 'DESC', limit: 25})
```

## Statistic

```
# Get a statistic by key and time
Xeta.statistic.get({key: STRING, time: TIMESTAMP(s)})

# Scan statistics by key
Xeta.statistic.scan({key: STRING})
```

# Modules

Modules are wrapper methods that submit transactions to the network endpoint. Fees for methods are fixed and most recent fees can be found on [docs.xetareality.com](https://docs.xetareality.com). 

## Transaction

```
# Create a basic transaction
Xeta.transaction.create({amount: 10, to: ADDRESS, token: ADDRESS})

# Create a transaction using an existing allowance
Xeta.transaction.create({amount: 10, to: ADDRESS, token: ADDRESS, from: ADDRESS})

# Create a delegate transaction (fees paid by recipient)
Xeta.transaction.create({amount: 10, to: ADDRESS, token: ADDRESS, delegate: true})

# Sponsor an address (for XETA fee-delegation)
Xeta.transaction.sponsor({amount: 10, to: ADDRESS})

# Batch distribute fungible tokens (up to 10 transfers per request})
Xeta.transaction.batchFt({token: ADDRESS, transactions: [{to: ADDRESS, amount: 5}, {to: ADDRESS, amount: 5}]})

# Batch distribute non-fungible tokens (up to 8 transfers per requests)
Xeta.transaction.batchNft({transactions: [{to: ADDRESS, token: ADDRESS}, {to: ADDRESS, token: ADDRESS}]})
```

## Token

```
# Create a non-fungible token
Xeta.token.create({name: 'Xeta Punk, supply: 1, object: URL, icon: URL, meta: ATTRIBUTES})

# Create a fungible token
Xeta.token.create({name: 'Bitcoin', ticker: 'BTC', supply: 21000000, icon: URL})

# Batch create non-fungible tokens (up to 40 tokens per request)
Xeta.token.batch({tokens: [{name: 'Xeta Punk #1', object: URL, icon: URL}, {name: 'Xeta Punk #2', object: URL, icon: URL}]})

# Mint reserve-supply for a fungible token
Xeta.token.mint({token: ADDRESS, amount: 10})

# Update details for a token (description, links, meta, icon)
Xeta.token.update({token: ADDRESS, description: TEXT, links: [LINK, LINK], meta: TEXT, icon: URL})
```

## Pool

For pool creation, it is recommended to use the program-specific methods (which are wrappers around this method). Available pool programs are auction, launch, lock, loot, lottery, royalty, staking, swap, vote.

```
# Create a pool
Xeta.pool.create({token: ADDRESS, program: PROGRAM, expires: TIMESTAMP})
```

## Allowance

```
# Create an allowance
Xeta.allowance.create({spender: ADDRESS, amount: 10, token: ADDRESS})

# Batch create allowances (up to 100 spenders per request)
Xeta.allowance.batch({token: ADDRESS, allowances: [{spender: ADDRESS, amount: 10}, {spender: ADDRESS, amount: 10}]})
```

# Programs

Pools are based on programs, which are pre-written smart contracts on Xeta. For further details on individual functionalities or requirements check out the [Xeta Reality Docs](https://docs.xetareality.com). To get the pool object from pool-address, use the Xeta.pool.get interface method.

## Auction

Creator methods:
```
# Create an auction pool
auction = Xeta.auction.create({token: ADDRESS, expires: TIMESTAMP, xetaTarget: 10, xetaLimit: 100})

# Deposit the pool-token to be auctioned (FT or NFT)
auction.deposit({amount: 10})

# Close an auction
auction.close()
```

Participant methods:
```
# Submit a XETA-bid
auction.transfer({amount: 5})

# Resolve an auction
auction.resolve()

# Cancel an auction
auction.cancel()
```

## Launch

Creator methods:
```
# Create a launch pool
launch = Xeta.launch.create({token: ADDRESS, expires: TIMESTAMP, xetaTarget: 10, xetaLimit: 100})

# Deposit the pool-token to be launched
launch.deposit({amount: 10})

# Withdraw the pool-token
launch.withdraw()

# Close a launch pool
launch.close()
```

Participant methods:
```
# Resolve a launch (if expired or limit is met)
launch.resolve()

# Participate with a XETA transfer
launch.transfer({amount: 5})

# Swap directly (if launch pool has a swap-rate)
launch.swap({amount: 5})

# Claim after expiry
launch.claim()
```

## Lock

Creator methods:
```
# Create a lock pool
lock = Xeta.lock.create({token: ADDRESS, expires: TIMESTAMP})
```

Participant methods:
```
# Deposit the pool-token to be locked
lock.transfer({amount: 10, unlocks: TIMESTAMP})

# Deposit the pool-token to be locked (unlockable by someone else)
lock.transfer({amount: 10, unlocks: TIMESTAMP, address: ADDRESS})

# Claim locked tokens after unlock time expires
lock.claim()
```

## Loot

Creator methods:
```
# Create a loot pool (returns a random NFT with 50% probability, for the participation amount of 5 token)
loot = Xeta.loot.create({token: ADDRESS, probability: 0.5, minAmount: 5, maxAmount: 5})

# Deposit an NFT to the loot pool
loot.deposit({token: ADDRESS})

# Withdraw a deposited NFT
loot.withdraw({token: ADDRESS})

# Clear a loot pools earnings
loot.clear()
```

Participant methods:
```
# Participate in loot pool
loot.transfer({amount: 5})
```

## Lottery

Creator methods:
```
# Create a lottery pool
lottery = Xeta.lottery.create({token: ADDRESS, expires: TIMESTAMP, claimsLimit: 1000, transfersLimit: 10000})

# Deposit pool tokens to be promoted
lottery.deposit({amount: 1000})

# Withdraw the deposited pool tokens
lottery.withdraw()

# Close a lottery pool
lottery.close()

# Clear a lottery (if participation is paid)
lottery.clear()
```

Participant methods:
```
# Participate in the lottery
lottery.transfer({amount: 0})

# Claim after pool expiry/closure
lottery.claim()
```

## Royalty

Creator methods:
```
# Create a royalty pool (30% APY)
royalty = Xeta.royalty.create({token: ADDRESS, rate: 0.3})

# Deposit royalty rewards to the royalty pool
royalty.deposit({amount: 1000})

# Withdraw deposited royalty rewards
royalty.withdraw()

# Close a royalty pool
royalty.close()
```

Participant methods:
```
# Transfer (make a royalty claim for a NFT)
royalty.transfer({token: ADDRESS})

# Make a royalty claim for a NFT
royalty.claim({token: ADDRESS})
```

## Staking

Creator methods:
```
# Create a staking pool (30% APY, 50% bonus, min. 30d lock, max 1y lock, min/max lock amounts)
staking = Xeta.staking.create({token: ADDRESS, rate: 0.3, percentage: 0.5, minTime: 30*86400000, maxTime: 365*86400000, maxAmount: 1000000})

# Deposit staking rewards
staking.deposit({amount: 1000})

# Withdraw deposited rewards
staking.withdraw()
```

Participate methods:
```
# Create a stake
staking.transfer({amount: 10, unlocks: int(time.time()+30*86400000)})

# Claim amount and staking rewards
staking.claim()
```

## Swap

Swap pools are automatically created for all fungible tokens, with the same pool-address as the token-address.

Liquidity provider methods:
```
# Deposit the pool-token to be auctioned (FT or NFT)
swap.deposit({token: ADDRESS, amount: 10})

# Supply liquidity (once pool token and XETA has been deposited)
swap.supply()

# Withdraw 50% of supplied liqudity
swap.withdraw({percentage: 0.5})
```

Participant methods:
```
# Transfer to swap pool (either pool token or XETA)
swap.transfer({token: ADDRESS, amount: 5})
```

## Vote

Creator methods:
```
# Create an vote (with a max. voting amount, and a candidate-resolution mechanism)
vote = Xeta.vote.create({token: ADDRESS, expires: TIMESTAMP, mechanism: 'candidate', maxAmount: 50, candidates: [ADDRESS, ADDRESS]})
```

Participant methods:
```
# Submit a XETA-bid
vote.transfer({amount: 5, answer: HASH, number: NUMBER})

# Resolve a finished vote
vote.resolve()

# Claim proceeds (if mechanism is top:N)
vote.claim()
```

# Feedback & Contributions

We encourage contributions to this library. Please also join our social channels in case you have suggestions or require technical help.

[**Website**](https://xetareality.com)
[**App**](https://xeta.network)
[**Twitter**](https://twitter.com/XetaReality)
[**Telegram**](https://t.me/XetaReality)