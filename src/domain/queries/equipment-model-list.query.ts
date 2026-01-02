import type {ListQuery} from "@/domain/list-query.ts";

type EquipmentModelSortBy = "name";

interface EquipmentModelFilters { name?: string }

type EquipmentModelListQuery = ListQuery<EquipmentModelFilters, EquipmentModelSortBy>;

export type {
    EquipmentModelListQuery,
    EquipmentModelSortBy,
    EquipmentModelFilters,
}