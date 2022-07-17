import { Group } from "../../../src/domain/models"
import { LoadGroupRepository } from "../../../src/domain/repositories"

export class LoadGroupRepositorySpy implements LoadGroupRepository {
    eventId?: string
    callsCount = 0
    output?: Group = new Group({
        users: [{ id: 'any_user_id', permission: 'admin' }]
    })

    async load({ eventId }: { eventId: string }): Promise<any> {
        this.eventId = eventId
        this.callsCount++
        return this.output
    }
}