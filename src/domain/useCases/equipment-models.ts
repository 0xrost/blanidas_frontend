import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {EquipmentModelsRepository} from "@/domain/repositories/equipment-models.ts";
import type {EquipmentModelsSorting} from "@/domain/query/equipment-models.query.ts";

const listEquipmentModelsUseCase =
    (repo: EquipmentModelsRepository) =>
        async (pagination: Pagination, sorting: EquipmentModelsSorting): Promise<PaginationResponse<EquipmentModel>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit)
            return await repo.list(pagination, sorting);
        };

export { listEquipmentModelsUseCase };