import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {FailureTypeRepository} from "@/domain/repositories/failure-type.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";

const listFailureTypesUseCase =
    (repo: FailureTypeRepository) =>
        async (pagination: Pagination): Promise<PaginationResponse<FailureType>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            if (pagination.limit < 1 && pagination.limit !== -1) throw new InvalidLimitError(pagination.limit);
            return await repo.list(pagination);
        }

export { listFailureTypesUseCase };