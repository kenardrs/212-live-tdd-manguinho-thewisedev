import { Group } from "../models";

export interface LoadGroupRepository {
    load: (input: { eventId: string }) => Promise<Group | undefined>
}