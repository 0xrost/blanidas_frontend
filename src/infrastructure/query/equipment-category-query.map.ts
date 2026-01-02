import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {
    EquipmentCategoryFilters,
    EquipmentCategorySortBy
} from "@/domain/queries/equipment-category-list.query.ts";

const equipmentCategoryFilterMap: Record<keyof EquipmentCategoryFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const equipmentCategorySortMap: Record<EquipmentCategorySortBy, string> = { name: "name" };

export { equipmentCategoryFilterMap, equipmentCategorySortMap };