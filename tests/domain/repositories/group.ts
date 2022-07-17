import { Group } from "../../../src/domain/models";

export interface LoadGroupRepository {
    load: (input: { eventId: string }) => Promise<Group | undefined>
}