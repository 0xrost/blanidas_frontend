import type {Sorting} from "@/domain/query/query.ts";

type SupplierSortBy = "name";
type SuppliersSorting = Sorting<SupplierSortBy>;

interface SuppliersFilters { name?: string }

export type {
    SupplierSortBy,
    SuppliersSorting,
    SuppliersFilters
}