import type { IManufacturersRepository } from "@/domain/repositories/manufacturers.ts";
import type {ManufacturersFilters, ManufacturersSorting} from "@/domain/query/manufacturer.query.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";

class ManufacturersRepository implements IManufacturersRepository {
    async list(pagination: Pagination, filters: ManufacturersFilters, sorting: ManufacturersSorting): Promise<PaginationResponse<Manufacturer>> {
        const response = await fetch(Endpoints.manufacturers.list(pagination, filters, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), (data: unknown): Manufacturer => data as Manufacturer);
    }
}

export { ManufacturersRepository };