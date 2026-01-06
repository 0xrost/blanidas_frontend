import type {RepairRequestFilters, RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";
import type {FilterDefinition} from "@/infrastructure/query/map.ts";

const repairRequestsFilterMap: Record<keyof RepairRequestFilters, FilterDefinition> = {
    idNotEqualTo: {
        field: "id",
        operator: "ne",
    },
    equipmentId: {
        field: "equipment_id",
        operator: "eq",
    },
    institutionId: {
        field: "equipment_institution_id",
        operator: "eq",
    },
    equipmentCategoryId: {
        field: "equipment_category_id",
        operator: "eq",
    },
    status: {
        field: "status",
        operator: "eq",
    },
    urgency: {
        field: "urgency",
        operator: "eq",
    },
    serialNumberOrEquipmentName: {
        field: "equipment_serial_number_or_equipment_equipment_model_name",
        operator: "ilike",
    }
};



const repairRequestsSortMap: Record<RepairRequestSortBy, string> = {
    date: "created_at",
    status: "status",
    model: "equipment_model_name",
    urgency: "urgency",
}



export { repairRequestsFilterMap, repairRequestsSortMap };