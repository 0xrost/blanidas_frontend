import type {ListQuery} from "@/domain/list-query.ts";

type SupplierSortBy = "name";
interface SupplierFilters { name?: string }

type SupplierListQuery = ListQuery<SupplierFilters, SupplierSortBy>;

export type {
    SupplierListQuery,
    SupplierSortBy,
    SupplierFilters
}