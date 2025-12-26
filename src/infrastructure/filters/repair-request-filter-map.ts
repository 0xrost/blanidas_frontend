import type {RepairRequestFilters} from "@/domain/filters/repair-request.filters.ts";
import type {FilterDefinition} from "@/infrastructure/filters/query-builder.ts";

const repairRequestFilterMap: Record<keyof RepairRequestFilters, FilterDefinition> = {
    serialNumber: {
        field: "equipment__serial_number",
        operator: "ilike",
    },
    equipmentModelName: {
        field: "equipment__model__name",
        operator: "ilike",
    },
    status: {
        field: "status",
        operator: "eq",
    },
    urgencyLevel: {
        field: "urgency_level",
        operator: "eq",
    },
};

export { repairRequestFilterMap };