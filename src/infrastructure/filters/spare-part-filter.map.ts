import type {FilterDefinition} from "@/infrastructure/filters/query-builder.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";

const sparePartFilterMap: Record<keyof SparePartFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    },
};

export { sparePartFilterMap };