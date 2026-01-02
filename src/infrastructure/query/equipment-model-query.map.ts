import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {EquipmentModelFilters, EquipmentModelSortBy} from "@/domain/queries/equipment-model-list.query.ts";

const equipmentModelFilterMap: Record<keyof EquipmentModelFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const equipmentModelSortMap: Record<EquipmentModelSortBy, string> = { name: "name" };

export { equipmentModelFilterMap, equipmentModelSortMap };