import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";
import type {SparePartCategoriesRepository} from "@/domain/repositories/spare-part-categories.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";

const listSparePartCategoriesUseCase =
    (repo: SparePartCategoriesRepository) =>
        async (pagination: Pagination, sorting: SparePartCategoriesSorting): Promise<PaginationResponse<SparePartCategory>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit)
            return await repo.list(pagination, sorting);
        };

export { listSparePartCategoriesUseCase };