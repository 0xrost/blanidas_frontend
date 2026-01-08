import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

const equipmentFilterMap: Record<keyof EquipmentFilters, FilterDefinition> = {
    nameOrSerialNumber: {
        field: "equipment_model_name_or_serial_number",
        operator: "ilike",
    },
    institutionId: {
        field: "institution_id",
        operator: "eq",
    },
    modelId: {
        field: "equipment_model_id",
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
    name: "name",
    institution: "institution_name",
    category: "equipment_category_name",
    manufacturer: "manufacturer_name",
};

export { equipmentFilterMap, equipmentSortMap };