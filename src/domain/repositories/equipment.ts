import type {Equipment} from "@/domain/entities/equipment.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {EquipmentUpdate} from "@/domain/models/equipment.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

interface EquipmentRepository extends CRUDRepository<
    Equipment,
    EquipmentCreate,
    EquipmentUpdate,
    EquipmentFilters,
    EquipmentSortBy
> {
    get(id: string): Promise<Equipment>;
}

export type { EquipmentRepository };