import type {RepairRequestStatus, UrgencyLevel} from "@/domain/entities/repair-request.ts";

interface RepairRequestFilters {
    serialNumber?: string;
    equipmentId?: string;
    equipmentModelName?: string;
    institutionId?: number;
    equipmentCategoryId?: number;
    status?: RepairRequestStatus;
    urgencyLevel?: UrgencyLevel;
}

type RepairRequestOrderBy = "date" | "urgencyLevel" | "equipmentModelName" | "status";

export type { RepairRequestFilters, RepairRequestOrderBy };