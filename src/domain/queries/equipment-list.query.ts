import type {ListQuery} from "@/domain/list-query.ts";
import type {Status} from "@/domain/entities/equipment.ts";

type EquipmentSortBy = "name" | "institution" | "manufacturer" | "category";

interface EquipmentFilters {
    nameOrSerialNumber?: string | null;
    manufacturerId?: string | null;
    institutionId?: string | null;
    modelId?: string | null;
    status?: Status | null;
}

type EquipmentListQuery = ListQuery<EquipmentFilters, EquipmentSortBy>;

export type {
    EquipmentListQuery,
    EquipmentSortBy,
    EquipmentFilters,
}