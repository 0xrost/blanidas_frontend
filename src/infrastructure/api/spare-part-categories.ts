import type {SparePartCategoriesRepository as SparePartCategoriesRepositoryInterface} from "@/domain/repositories/spare-part-categories.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";

class SparePartCategoriesRepository implements SparePartCategoriesRepositoryInterface {
    async list(pagination: Pagination, sorting: SparePartCategoriesSorting): Promise<PaginationResponse<SparePartCategory>> {
        const response = await fetch(Endpoints.sparePartCategories.list(pagination, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), (data: unknown): SparePartCategory => data as SparePartCategory);
    }
}

export { SparePartCategoriesRepository };