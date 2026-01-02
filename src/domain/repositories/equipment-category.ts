import type {EquipmentCategoryFilters, EquipmentCategorySortBy} from "@/domain/queries/equipment-category-list.query.ts";
import type {EquipmentCategoryCreate, EquipmentCategoryUpdate} from "@/domain/models/equipment-category.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";

interface EquipmentCategoryRepository extends CRUDRepository<
    EquipmentCategory,
    EquipmentCategoryCreate,
    EquipmentCategoryUpdate,
    EquipmentCategoryFilters,
    EquipmentCategorySortBy
> {}

export type { EquipmentCategoryRepository };