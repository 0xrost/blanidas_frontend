import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface InstitutionDto {
    id: string;
    name: string;
    address: string;
    institution_type: InstitutionType | null;
    contact_phone: string;
    contact_email: string;
}

interface InstitutionCreateDto {
    name: string;
    address: string;
    institution_type_id: string;
    contact_phone: string;
    contact_email: string;
}

interface InstitutionUpdateDto {
    id: string
    name?: string | null
    address?: string | null;
    institution_type_id?: string | null;
    contact_phone?: string | null;
    contact_email?: string | null;
}

export type {
    InstitutionDto,
    InstitutionUpdateDto,
    InstitutionCreateDto
};