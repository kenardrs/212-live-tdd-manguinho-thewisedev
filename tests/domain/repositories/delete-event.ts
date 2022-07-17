import { DeleteEventRepository } from "../../../src/domain/repositories"

export class DeleteEventRepositoryMock implements DeleteEventRepository {
    id?: string
    callsCount = 0

    async delete({ id }: { id: string }): Promise<void> {
        this.id = id
        this.callsCount++
    }
}