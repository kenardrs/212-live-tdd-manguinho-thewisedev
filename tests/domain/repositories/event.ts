export interface DeleteEventRepository {
    delete: (input: { id: string }) => Promise<void>
}