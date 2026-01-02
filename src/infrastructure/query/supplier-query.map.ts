import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {SupplierFilters, SupplierSortBy} from "@/domain/queries/supplier-list.query.ts";

const supplierFilterMap: Record<keyof SupplierFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const supplierSortMap: Record<SupplierSortBy, string> = { name: "name" };

export { supplierFilterMap, supplierSortMap };