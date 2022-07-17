import { DeleteEvent } from '../../../src/domain/usecases'
import { LoadGroupRepositorySpy, DeleteEventRepositoryMock, DeleteMatchRepositoryMock } from '../repositories'


type SutTypes = { 
    sut: DeleteEvent, 
    loadGroupRepository: LoadGroupRepositorySpy,
    deleteEventRepository: DeleteEventRepositoryMock,
    deleteMatchRepository: DeleteMatchRepositoryMock,
}

// Factory pattern
const makeSut = (): SutTypes => {
    const loadGroupRepository = new LoadGroupRepositorySpy()
    const deleteEventRepository = new DeleteEventRepositoryMock()
    const deleteMatchRepository = new DeleteMatchRepositoryMock()
    const sut = new DeleteEvent(loadGroupRepository, deleteEventRepository, deleteMatchRepository)
    return { 
        sut, 
        loadGroupRepository,
        deleteEventRepository,
        deleteMatchRepository
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
            users: [{ id: 'any_user_id', permission: 'admin' }]
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

    it('should not throw error if permission is admin', async () => {
        const { sut, loadGroupRepository } = makeSut()
        loadGroupRepository.output = {
            users: [{ id: 'any_user_id', permission: 'admin' }]
        }

        const promise = sut.perform({id, userId})

        await expect(promise).resolves.not.toThrowError()
    })

    it('should not throw error if permission is owner', async () => {
        const { sut, loadGroupRepository } = makeSut()
        loadGroupRepository.output = {
            users: [{ id: 'any_user_id', permission: 'owner' }]
        }

        const promise = sut.perform({id, userId})

        await expect(promise).resolves.not.toThrowError()
    })

    it('should delete event', async () => {
        const { sut, deleteEventRepository } = makeSut()

        await sut.perform({id, userId})

        expect(deleteEventRepository.id).toBe(id)
        expect(deleteEventRepository.callsCount).toBe(1)
    })

    it('should delete match', async () => {
        const { sut, deleteMatchRepository } = makeSut()

        await sut.perform({id, userId})

        expect(deleteMatchRepository.eventId).toBe(id)
        expect(deleteMatchRepository.callsCount).toBe(1)
    })

})