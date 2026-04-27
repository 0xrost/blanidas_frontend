interface InstitutionCreate {
    name: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
    is_default: boolean;
}

interface InstitutionUpdate {
    id: string
    name?: string | null
    address?: string | null;
    contactPhone?: string | null;
    contactEmail?: string | null;
    is_default?: boolean | null;
}

export type {
    InstitutionUpdate,
    InstitutionCreate,
}