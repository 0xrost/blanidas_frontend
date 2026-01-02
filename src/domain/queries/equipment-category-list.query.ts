import type {ListQuery} from "@/domain/list-query.ts";

type EquipmentCategorySortBy = "name";
interface EquipmentCategoryFilters { name?: string }

type EquipmentCategoryListQuery = ListQuery<EquipmentCategoryFilters, EquipmentCategorySortBy>;

export type {
    EquipmentCategoryListQuery,
    EquipmentCategorySortBy,
    EquipmentCategoryFilters
}