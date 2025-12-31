import type {Sorting} from "@/domain/query/query.ts";

type SparePartCategorySortBy = "name";
type SparePartCategoriesSorting = Sorting<SparePartCategorySortBy>;

interface SparePartCategoriesFilters { name?: string }

export type {
    SparePartCategorySortBy,
    SparePartCategoriesSorting,
    SparePartCategoriesFilters
}