import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface InstitutionDto {
    id: number;
    name: string;
    address: string;
    institution_type: InstitutionType;
    contact_phone: string;
    contact_email: string;
}

export type { InstitutionDto };