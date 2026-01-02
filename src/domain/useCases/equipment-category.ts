import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {EquipmentCategoryCreate, EquipmentCategoryUpdate} from "@/domain/models/equipment-category.ts";
import type {
    EquipmentCategoryFilters,
    EquipmentCategorySortBy
} from "@/domain/queries/equipment-category-list.query.ts";
import type {EquipmentCategoryRepository} from "@/domain/repositories/equipment-category.ts";

const EquipmentCategoryUseCases = createCrudUseCases<
    EquipmentCategory,
    EquipmentCategoryCreate,
    EquipmentCategoryUpdate,
    EquipmentCategoryFilters,
    EquipmentCategorySortBy,
    EquipmentCategoryRepository
>();

export const {
    list: listEquipmentCategoriesUseCase,
    create: createEquipmentCategoryUseCase,
    update: updateEquipmentCategoryUseCase,
    delete: deleteEquipmentCategoryUseCase
} = EquipmentCategoryUseCases;