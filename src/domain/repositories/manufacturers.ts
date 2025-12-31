import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {ManufacturersFilters, ManufacturersSorting} from "@/domain/query/manufacturer.query.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";

interface IManufacturersRepository {
    list(pagination: Pagination, filters: ManufacturersFilters, sorting: ManufacturersSorting): Promise<PaginationResponse<Manufacturer>>;
}

export type { IManufacturersRepository };