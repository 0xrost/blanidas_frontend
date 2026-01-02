interface FailureTypeCreate {
    name: string;
}

interface FailureTypeUpdate {
    id: string
    name?: string | null
}

export type {
    FailureTypeUpdate,
    FailureTypeCreate,
}