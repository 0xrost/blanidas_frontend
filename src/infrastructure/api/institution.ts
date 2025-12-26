import type {InstitutionRepository as InstitutionRepositoryInterface} from "@/domain/repositories/institution.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapApiInstitution} from "@/infrastructure/mappers/institution.ts";

class InstitutionRepository implements InstitutionRepositoryInterface {
    async list(page: number, limit: number): Promise<Institution[]> {
        const response = await fetch(Endpoints.institution.list(page, limit));
        return (await response.json()).items.map(mapApiInstitution);
    }
}

export { InstitutionRepository };