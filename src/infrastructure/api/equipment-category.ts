import type {EquipmentCategoryRepository as EquipmentCategoryRepositoryInterface} from "@/domain/repositories/equipment-category.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {EquipmentCategoryCreate, EquipmentCategoryUpdate} from "@/domain/models/equipment-category.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {
    EquipmentCategoryFilters,
    EquipmentCategorySortBy
} from "@/domain/queries/equipment-category-list.query.ts";


const equipmentCategoryMappers: CRUDMappers<
    EquipmentCategory,
    EquipmentCategory,
    EquipmentCategoryCreate,
    EquipmentCategoryCreate,
    EquipmentCategoryUpdate,
    EquipmentCategoryUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class EquipmentCategoryRepository extends CRUDRepository<
    EquipmentCategory,
    EquipmentCategory,
    EquipmentCategoryCreate,
    EquipmentCategoryCreate,
    EquipmentCategoryUpdate,
    EquipmentCategoryUpdate,
    EquipmentCategoryFilters,
    EquipmentCategorySortBy
> implements EquipmentCategoryRepositoryInterface {
    constructor() {
        super(Endpoints.equipmentCategory, equipmentCategoryMappers);
    }
}

export { EquipmentCategoryRepository };