import { Instruction } from './instruction'
import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Models } from '../library/models'

export const Token = {
    /**
     * Create token
     */
    create: async ({name, symbol=null, supply=null, reserve=null, description=null, links=null, meta=null, icon=null, owner=null, frozen=null, category=null, object=null, mime=null}, tx={}) => {
        var token = Utils.strip({
            function: 'token.create',
            name: name,
            symbol: symbol,
            supply: Utils.amount(supply),
            reserve: Utils.amount(reserve),
            description: description,
            links: links,
            meta: meta,
            icon: icon,
            owner: owner,
            frozen: frozen,
            category: category,
            object: object,
            mime: mime,
        })

        if (supply) {
            Models.requiredFields(token, ['name', 'symbol', 'supply'])
            Models.exclusiveFields(token, ['function', 'name', 'description', 'links', 'meta', 'icon', 'symbol', 'supply', 'reserve'])
        } else {
            Models.requiredFields(token, ['name'])
            Models.exclusiveFields(token, ['function', 'name', 'description', 'links', 'meta', 'icon', 'owner', 'frozen', 'category', 'object', 'mime'])
        }

        return Instruction.wrap(token, tx)
    },
    /**
     * Update specified values of an token
     */
    update: async ({token, name=null, description=null, links=null, meta=null, icon=null, frozen=null, category=null, object=null, mime=null}, tx={}) => {
        return Instruction.wrap({
            function: 'token.update',
            token: token,
            name: name,
            description: description,
            links: links,
            meta: meta,
            icon: icon,
            frozen: frozen,
            category: category,
            object: object,
            mime: mime,
        }, tx)
    },
    /**
     * Mint from reserve
     */
    mint: async ({token, amount}, tx={}) => {
        return Instruction.wrap({
            function: 'token.mint',
            token: token,
            amount: Utils.amount(amount),
        }, tx)
    },
    /**
     * Transfer token
     */
    transfer: async ({token, to}, tx={}) => {
        return Instruction.wrap({
            function: 'token.transfer',
            token: token,
            to: to,
        }, tx)
    },
    /**
     * Read token by address
     */
    read: async ({address}, args={}) => {
        return Resource.read({...{
            type: 'token',
            key: address,
        }, ...args})
    },
    /**
     * List tokens by addresses
     */
    list: async ({addresses}, args={}) => {
        return Resource.list({...{
            type: 'token',
            keys: addresses,
        }, ...args})
    },
    /**
     * Scan tokens by creator, sort by created
     */
    scanCreatorCreated: async ({creator, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'creator',
            indexValue: creator,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan tokens by name, sort by created
     */
    scanNameCreated: async ({name, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'name',
            indexValue: name,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan tokens by symbol, sort by created
     */
    scanSymbolCreated: async ({symbol, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'symbol',
            indexValue: symbol,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan tokens by owner, sort by created
     */
    scanOwnerCreated: async ({owner, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'owner',
            indexValue: owner,
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan tokens by owner and category, sort by created
     */
    scanOwnerCategoryCreated: async ({owner, category, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'ownerCategory',
            indexValue: (await Hashed.values([owner, category])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
    /**
     * Scan tokens by creator and category, sort by created
     */
    scanCreatorCategoryCreated: async ({creator, category, created=null, address=null}, args={}) => {
        return Resource.scan({...{
            type: 'token',
            index: 'creatorCategory',
            indexValue: (await Hashed.values([creator, category])).slice(-8),
            sort: 'created',
            sortValue: created,
            keyValue: address,
        }, ...args})
    },
}