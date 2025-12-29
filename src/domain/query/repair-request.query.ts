import type {Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {Sorting} from "@/domain/query/query.ts";

type RepairRequestSortBy = "date" | "urgency" | "model" | "status";
type RepairRequestSorting = Sorting<RepairRequestSortBy>;

interface RepairRequestFilters {
    status?: Status;
    equipmentId?: string;
    urgency?: Urgency;
    idNotEqualTo?: string;
    serialNumber?: string;
    institutionId?: string;
    equipmentCategoryId?: string;
    serialNumberOrEquipmentName?: string;
}

export type { RepairRequestFilters, RepairRequestSorting, RepairRequestSortBy };