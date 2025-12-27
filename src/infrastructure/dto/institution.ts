import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface InstitutionDTO {
    id: number;
    name: string;
    address: string;
    institution_type: InstitutionType | null;
    contact_phone: string;
    contact_email: string;
}

export type { InstitutionDTO };