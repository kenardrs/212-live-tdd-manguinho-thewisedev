export interface DeleteMatchRepository {
    delete: (input: { eventId: string }) => Promise<void>
}