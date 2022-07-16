import { type } from "os"

class DeleteEvent {
    constructor( 
        private readonly loadGroupRepository: LoadGroupRepository
    ) {}

    async perform({ id, userId }: {id: string, userId: string}): Promise<void> {
        const group = await this.loadGroupRepository.load({ eventId: id})
        if ( group === undefined ) throw new Error()
        if ( group.users.find(user => user.id === userId) === undefined) throw new Error()
        if ( group.users.find(user => user.id === userId)?.permission === 'user' ) throw new Error()
    }
}

interface LoadGroupRepository {
    load: (input: { eventId: string }) => Promise<Group | undefined>
}

// Creating as a 'type' instead a class because it does not have behavior yet
type Group = {
    users: GroupUser[]
}

type GroupUser = {
    id: string
    permission: string
}

class LoadGroupRepositoryMock implements LoadGroupRepository {
    eventId?: string
    callsCount = 0
    output?: Group = {
        users: [{ id: 'any_user_id', permission: 'any' }]
    }

    async load({ eventId }: { eventId: string }): Promise<any> {
        this.eventId = eventId
        this.callsCount++
        return this.output
    }
}

type SutTypes = { 
    sut: DeleteEvent, 
    loadGroupRepository: LoadGroupRepositoryMock 
}

// Factory pattern
const makeSut = (): SutTypes => {
    const loadGroupRepository = new LoadGroupRepositoryMock()
    const sut = new DeleteEvent(loadGroupRepository)
    return { 
        sut, 
        loadGroupRepository 
    }
}

describe('DeleteEvent', () => {
    // moved to test variables to make easy to reuse it
    const id = 'any_event_id'
    const userId = 'any_user_id'

    it('should get group data', async () => {
        const { sut, loadGroupRepository } = makeSut()

        await sut.perform({id, userId})

        expect(loadGroupRepository.eventId).toBe(id)
        expect(loadGroupRepository.callsCount).toBe(1)
    })

    it('should throw error if eventId is invalid', async () => {
        const { sut, loadGroupRepository } = makeSut()
        loadGroupRepository.output = undefined

        // how to test exception at asynchronous statements promise
        // 1 - set promise into a variable
        const promise = sut.perform({id, userId})

        // 2 - test promise await rejects against an generic error throws 
        await expect(promise).rejects.toThrowError()
    })

    it('should throw error if userId is invalid', async () => {
        const { sut, loadGroupRepository } = makeSut()
        loadGroupRepository.output = {
            users: [{ id: 'any_user_id', permission: 'any' }]
        }

        const promise = sut.perform({id, userId: 'invalid_id'})

        await expect(promise).rejects.toThrowError()
    })

    it('should throw error if permission is user', async () => {
        const { sut, loadGroupRepository } = makeSut()
        loadGroupRepository.output = {
            users: [{ id: 'any_user_id', permission: 'user' }]
        }

        const promise = sut.perform({id, userId})

        await expect(promise).rejects.toThrowError()
    })

})