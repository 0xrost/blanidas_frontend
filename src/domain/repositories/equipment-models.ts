import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {EquipmentModelFilters, EquipmentModelSortBy} from "@/domain/queries/equipment-model-list.query.ts";
import type {EquipmentModelCreate, EquipmentModelUpdate} from "@/domain/models/equipment-model.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface EquipmentModelRepository extends CRUDRepository<
    EquipmentModel,
    EquipmentModelCreate,
    EquipmentModelUpdate,
    EquipmentModelFilters,
    EquipmentModelSortBy
> {}

export type { EquipmentModelRepository };
