import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SuppliersSorting} from "@/domain/query/suppliers.query.ts";

interface SuppliersRepository {
    list(pagination: Pagination, sorting: SuppliersSorting): Promise<PaginationResponse<Supplier>>;
}

export type { SuppliersRepository };