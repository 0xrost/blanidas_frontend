import type {SuppliersRepository as SuppliersRepositoryInterface} from "@/domain/repositories/suppliers.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SuppliersSorting} from "@/domain/query/suppliers.query.ts";
import {mapSupplierDtoToDomain} from "@/infrastructure/mappers/supplier.ts";

class SuppliersRepository implements SuppliersRepositoryInterface {
    async list(pagination: Pagination, sorting: SuppliersSorting): Promise<PaginationResponse<Supplier>> {
        const response = await fetch(Endpoints.suppliers.list(pagination, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), mapSupplierDtoToDomain);
    }
}

export { SuppliersRepository };