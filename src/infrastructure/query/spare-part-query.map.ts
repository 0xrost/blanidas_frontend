import type {FilterDefinition} from "@/infrastructure/query/query-builder.ts";
import type {SparePartsFilters, SparePartsSortBy} from "@/domain/query/spare-part.query.ts";

const sparePartsFiltersMap: Record<keyof SparePartsFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    },
};

const sparePartsSortingMap: Record<SparePartsSortBy, string> = {
    status: "status",
    name: "name",
    quantity: "quantity",
}

export {
    sparePartsFiltersMap,
    sparePartsSortingMap,
};