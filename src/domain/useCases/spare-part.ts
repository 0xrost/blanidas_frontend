import type {SparePartsRepository} from "@/domain/repositories/spare-part.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {InvalidPageNumberError} from "@/domain/errors.ts";
import type {SparePartUpdate} from "@/domain/models/spare-parts.ts";

const listSparePartsUseCase =
    (repo: SparePartsRepository) =>
        async (pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting): Promise<PaginationResponse<SparePart>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidPageNumberError(pagination.limit);
            return await repo.list(pagination, filters, sorting);
        };

const updateSparePartsUseCase =
    (repo: SparePartsRepository) =>
        async (data: SparePartUpdate): Promise<SparePart> =>
            await repo.update(data);


export {
    listSparePartsUseCase,
    updateSparePartsUseCase,
};