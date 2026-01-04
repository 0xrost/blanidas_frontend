import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

const equipmentFilterMap: Record<keyof EquipmentFilters, FilterDefinition> = {
    nameOrSerialNumber: {
        field: "equipment_model__name__or__serial_number",
        operator: "ilike",
    },
    institutionId: {
        field: "institution_id",
        operator: "eq",
    },
    categoryId: {
        field: "equipment_category_id",
        operator: "eq",
    },
    manufacturerId: {
        field: "manufacturer_id",
        operator: "eq",
    },
    status: {
        field: "status",
        operator: "eq",
    },
};

const equipmentSortMap: Record<EquipmentSortBy, string> = {
    name: "equipment_model__name",
    institution: "institution__name",
    category: "equipment_category__name",
    manufacturer: "manufacturer__name",
};

export { equipmentFilterMap, equipmentSortMap };