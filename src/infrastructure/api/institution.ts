import type {InstitutionRepository as InstitutionRepositoryInterface} from "@/domain/repositories/institution.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapInstitutionDtoToDomain} from "@/infrastructure/mappers/institution.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";

class InstitutionRepository implements InstitutionRepositoryInterface {
    async list(pagination: Pagination): Promise<PaginationResponse<Institution>> {
        const response = await fetch(Endpoints.institution.list(pagination));
        return mapPaginationResponseDtoToDomain(await response.json(), mapInstitutionDtoToDomain)
    }
}

export { InstitutionRepository };