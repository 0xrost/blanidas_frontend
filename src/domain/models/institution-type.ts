interface InstitutionTypeCreate {
    name: string;
}

interface InstitutionTypeUpdate {
    id: string
    name?: string | null
}

export type {
    InstitutionTypeUpdate,
    InstitutionTypeCreate,
}