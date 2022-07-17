import { GroupUser } from './'

// Creating as a 'type' instead a class because it does not have behavior yet
export type Group = {
    users: GroupUser[]
}