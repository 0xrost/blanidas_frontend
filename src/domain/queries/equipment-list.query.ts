import type {ListQuery} from "@/domain/list-query.ts";

type EquipmentSortBy = "name" | "institution" | "status";

type EquipmentStatus = "working" | "maintenance" | "not working";
interface EquipmentFilters {
    nameOrSerialNumber?: string | null;
    institutionId?: string | null;
    categoryId?: string | null;
    status?: EquipmentStatus | null;
}

type EquipmentListQuery = ListQuery<EquipmentFilters, EquipmentSortBy>;

export type {
    EquipmentListQuery,
    EquipmentSortBy,
    EquipmentFilters,
}