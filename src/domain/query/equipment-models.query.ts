import type {Sorting} from "@/domain/query/query.ts";

type EquipmentModelSortBy = "name";
type EquipmentModelsSorting = Sorting<EquipmentModelSortBy>;

interface EquipmentModelsFilters { name?: string }

export type {
    EquipmentModelSortBy,
    EquipmentModelsSorting,
    EquipmentModelsFilters
}