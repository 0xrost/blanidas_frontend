import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {SparePartCategoryFilters, SparePartCategorySortBy} from "@/domain/queries/spare-part-category-list.query.ts";

const sparePartCategoryFilterMap: Record<keyof SparePartCategoryFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const sparePartCategorySortMap: Record<SparePartCategorySortBy, string> = { name: "name" };

export { sparePartCategoryFilterMap, sparePartCategorySortMap };