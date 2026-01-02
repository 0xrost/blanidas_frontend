import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {SparePartCategoryRepository as SparePartCategoryRepositoryInterface} from "@/domain/repositories/spare-part-categories.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {SparePartCategoryCreate, SparePartCategoryUpdate} from "@/domain/models/spare-part-category.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {
    SparePartCategoryFilters,
    SparePartCategorySortBy
} from "@/domain/queries/spare-part-category-list.query.ts";

const sparePartCategoryMappers: CRUDMappers<
    SparePartCategory,
    SparePartCategory,
    SparePartCategoryCreate,
    SparePartCategoryCreate,
    SparePartCategoryUpdate,
    SparePartCategoryUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class SparePartCategoryRepository extends CRUDRepository<
    SparePartCategory,
    SparePartCategory,
    SparePartCategoryCreate,
    SparePartCategoryCreate,
    SparePartCategoryUpdate,
    SparePartCategoryUpdate,
    SparePartCategoryFilters,
    SparePartCategorySortBy
> implements SparePartCategoryRepositoryInterface {
    constructor() {
        super(Endpoints.sparePartCategory, sparePartCategoryMappers);
    }
}

export { SparePartCategoryRepository }