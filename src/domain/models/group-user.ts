export type Permission = 'owner' | 'admin' | 'user'

// Changed to class because now it has rules, logic
export class GroupUser {
    readonly id: string
    readonly permission: Permission

    constructor({ id, permission }: { id: string, permission: Permission }) {
        this.id = id
        this.permission = permission
    }

    // Domain rule, more immutable, could happen in several use-cases so it's recommended to extract from 
    // specific use-case and move to it's own entity isolating and containing the code responsibility
    isAdmin (): boolean {
        return this.permission != 'user'
    }
}