import type {EquipmentCategoryRepository} from "@/domain/repositories/equipment-category.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";

const listEquipmentCategoriesUseCase =
    (repo: EquipmentCategoryRepository) =>
        async (pagination: Pagination): Promise<PaginationResponse<EquipmentCategory>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit)
            return await repo.list(pagination);
        }

export { listEquipmentCategoriesUseCase };