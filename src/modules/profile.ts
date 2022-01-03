import { Resource } from './resource'
import { Instruction } from './instruction'
import { Utils } from '../library/utils'
import { Config } from '../library/config'
import { $fetch } from 'ohmyfetch'

export const Profile = {
    /**
     * Update (or create) profile
     */
    update: async ({name=null, description=null, links=null, meta=null, preview=null, category=null}, tx={}) => {
        return Instruction.wrap({
            function: 'profile.update',
            name: name,
            description: description,
            links: links,
            meta: meta,
            preview: preview,
            category: category,
        }, tx)
    },
}