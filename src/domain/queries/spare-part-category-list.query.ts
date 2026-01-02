import type {ListQuery} from "@/domain/list-query.ts";

type SparePartCategorySortBy = "name";
interface SparePartCategoryFilters { name?: string }

type SparePartCategoryListQuery = ListQuery<SparePartCategoryFilters, SparePartCategorySortBy>;

export type {
    SparePartCategoryListQuery,
    SparePartCategorySortBy,
    SparePartCategoryFilters
}