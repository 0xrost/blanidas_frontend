import type {Institution} from "@/domain/entities/institution.ts";

interface InstitutionRepository {
    list(page: number, limit: number): Promise<Institution[]>;
}

export type { InstitutionRepository };