interface InstitutionCreate {
    name: string;
    address: string;
    typeId: string;
    contactPhone: string;
    contactEmail: string;
}

interface InstitutionUpdate {
    id: string
    name?: string | null
    address?: string | null;
    typeId?: string | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
}

export type {
    InstitutionUpdate,
    InstitutionCreate,
}