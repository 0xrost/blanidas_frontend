interface InstitutionDto {
    id: string;
    name: string;
    address: string;
    contact_phone: string;
    contact_email: string;
    is_default: boolean;
}

interface InstitutionCreateDto {
    name: string;
    address: string;
    contact_phone: string;
    contact_email: string;
    is_default: boolean;
}

interface InstitutionUpdateDto {
    id: string
    name?: string | null
    address?: string | null;
    contact_phone?: string | null;
    contact_email?: string | null;
    is_default?: boolean | null;
}

export type {
    InstitutionDto,
    InstitutionUpdateDto,
    InstitutionCreateDto
};