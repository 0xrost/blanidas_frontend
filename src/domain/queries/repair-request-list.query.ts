import type {Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {ListQuery} from "@/domain/list-query.ts";

type RepairRequestSortBy = "created_at" | "updated_at" | "urgency" | "model" | "status";
interface RepairRequestFilters {
    status?: Status;
    equipmentId?: string;
    urgency?: Urgency;
    idNotEqualTo?: string;
    institutionId?: string;
    equipmentCategoryId?: string;
    serialNumberOrEquipmentName?: string;
}

type RepairRequestListQuery = ListQuery<RepairRequestFilters, RepairRequestSortBy>;

export type {
    RepairRequestListQuery,
    RepairRequestFilters,
    RepairRequestSortBy,
};