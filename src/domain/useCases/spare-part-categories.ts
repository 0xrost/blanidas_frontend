import type {SparePartCategoryRepository} from "@/domain/repositories/spare-part-categories.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {SparePartCategoryFilters, SparePartCategorySortBy} from "@/domain/queries/spare-part-category-list.query.ts";
import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {SparePartCategoryCreate, SparePartCategoryUpdate} from "@/domain/models/spare-part-category.ts";

const SparePartCategoryUseCases = createCrudUseCases<
    SparePartCategory,
    SparePartCategoryCreate,
    SparePartCategoryUpdate,
    SparePartCategoryFilters,
    SparePartCategorySortBy,
    SparePartCategoryRepository
>();

export const {
    list: listSparePartCategoriesUseCase,
    create: createSparePartCategoryUseCase,
    update: updateSparePartCategoryUseCase,
    delete: deleteSparePartCategoryUseCase
} = SparePartCategoryUseCases;