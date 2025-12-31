import type {Supplier} from "@/domain/entities/supplier.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";
import type {SuppliersRepository} from "@/domain/repositories/suppliers.ts";
import type {SuppliersSorting} from "@/domain/query/suppliers.query.ts";

const listSuppliersUseCase =
    (repo: SuppliersRepository) =>
        async (pagination: Pagination, sorting: SuppliersSorting): Promise<PaginationResponse<Supplier>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit)
            return await repo.list(pagination, sorting);
        };

export { listSuppliersUseCase };