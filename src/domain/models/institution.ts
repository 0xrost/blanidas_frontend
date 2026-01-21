interface InstitutionCreate {
    name: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
}

interface InstitutionUpdate {
    id: string
    name?: string | null
    address?: string | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
}

export type {
    InstitutionUpdate,
    InstitutionCreate,
}