interface DAL {
    add: (channel_id: string, user_id: string) => any,
    remove: (channel_id: string) => any,
    update: (doc: any) => any,
    getById: (doc: any) => any
}
