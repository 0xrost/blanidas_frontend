import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {EquipmentModelRepository as EquipmentModelRepositoryInterface} from "@/domain/repositories/equipment-models.ts"
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {EquipmentModelCreate, EquipmentModelUpdate} from "@/domain/models/equipment-model.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {EquipmentModelFilters, EquipmentModelSortBy} from "@/domain/queries/equipment-model-list.query.ts";

const equipmentModelMappers: CRUDMappers<
    EquipmentModel,
    EquipmentModel,
    EquipmentModelCreate,
    EquipmentModelCreate,
    EquipmentModelUpdate,
    EquipmentModelUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class EquipmentModelRepository extends CRUDRepository<
    EquipmentModel,
    EquipmentModel,
    EquipmentModelCreate,
    EquipmentModelCreate,
    EquipmentModelUpdate,
    EquipmentModelUpdate,
    EquipmentModelFilters,
    EquipmentModelSortBy
> implements EquipmentModelRepositoryInterface {
    constructor() {
        super(Endpoints.equipmentModel, equipmentModelMappers);
    }
}

export { EquipmentModelRepository };