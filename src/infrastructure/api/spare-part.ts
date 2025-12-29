import type { SparePartsRepository as SparePartsRepositoryInterface } from "@/domain/repositories/spare-part.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import {mapSparePartDtoToDomain, mapSparePartUpdateDomainToDto} from "@/infrastructure/mappers/spare-part.ts";
import type {SparePartUpdate} from "@/domain/models/spare-parts.ts";
import {
    mapRepairRequestDtoToDomain,
    mapRepairRequestUpdateDomainToDto
} from "@/infrastructure/mappers/repair-request.ts";
import jsonRequestHeaders from "@/infrastructure/api/headers.ts";

class SparePartsRepository implements SparePartsRepositoryInterface {
    async list(pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting): Promise<PaginationResponse<SparePart>> {
        const response = await fetch(Endpoints.spareParts.list(pagination, filters, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), mapSparePartDtoToDomain)
    }

    async update(data: SparePartUpdate): Promise<SparePart> {
        const dataDto = mapSparePartUpdateDomainToDto(data);
        const response = await fetch(Endpoints.spareParts.update(), {
            ...jsonRequestHeaders,
            method: "PUT",
            body: JSON.stringify(dataDto),
        })

        return mapSparePartDtoToDomain(await response.json())
    }
}

export { SparePartsRepository };