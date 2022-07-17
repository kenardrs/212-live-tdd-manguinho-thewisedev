import { DeleteMatchRepository } from "../../../src/domain/repositories"

export class DeleteMatchRepositoryMock implements DeleteMatchRepository {
    eventId?: string
    callsCount = 0

    async delete({ eventId }: { eventId: string }): Promise<void> {
        this.eventId = eventId
        this.callsCount++
    }
}