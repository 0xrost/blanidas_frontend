import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {
    SparePartCategoryFilters,
    SparePartCategorySortBy
} from "@/domain/queries/spare-part-category-list.query.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {SparePartCategoryCreate, SparePartCategoryUpdate} from "@/domain/models/spare-part-category.ts";

interface SparePartCategoryRepository extends CRUDRepository<
    SparePartCategory,
    SparePartCategoryCreate,
    SparePartCategoryUpdate,
    SparePartCategoryFilters,
    SparePartCategorySortBy
> {}

export type { SparePartCategoryRepository };

