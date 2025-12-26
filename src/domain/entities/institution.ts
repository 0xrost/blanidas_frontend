import type {InstitutionType} from "@/domain/entities/institution-type.ts";

interface Institution {
    id: number;
    name: string;
    address: string;
    institutionType: InstitutionType | null;
    contactPhone: string;
    contactEmail: string;
}

export type { Institution };