import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

const equipmentFilterMap: Record<keyof EquipmentFilters, FilterDefinition> = {
    nameOrSerialNumber: {
        field: "name__or__serial_number",
        operator: "ilike",
    },
    institutionId: {
        field: "institution_id",
        operator: "eq",
    },
    categoryId: {
        field: "category_id",
        operator: "eq",
    },
    status: {
        field: "status",
        operator: "eq",
    },
};

const equipmentSortMap: Record<EquipmentSortBy, string> = {
    name: "name",
    status: "status",
    institution: "institution__name",
};

export { equipmentFilterMap, equipmentSortMap };