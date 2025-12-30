import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface Institution {
    id: string;
    name: string;
    address: string;
    institutionType: InstitutionType;
    contactPhone: string;
    contactEmail: string;
}

export type { Institution };