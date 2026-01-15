import type {Equipment, EquipmentQrData} from "@/domain/entities/equipment.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {EquipmentCreate, EquipmentUpdate} from "@/domain/models/equipment.ts";
import type {EquipmentFilters, EquipmentSortBy} from "@/domain/queries/equipment-list.query.ts";

interface EquipmentRepository extends CRUDRepository<
    Equipment,
    EquipmentCreate,
    EquipmentUpdate,
    EquipmentFilters,
    EquipmentSortBy
> {
    get(id: string): Promise<Equipment>;
    getQrData(): Promise<EquipmentQrData[]>;
}

export type { EquipmentRepository };