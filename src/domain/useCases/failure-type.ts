import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {FailureTypeRepository} from "@/domain/repositories/failure-type.ts";
import type {Pagination} from "@/domain/models/pagination.ts";

const listFailureTypesUseCase =
    (repo: FailureTypeRepository) =>
        async (pagination: Pagination): Promise<FailureType[]> =>
            await repo.list(pagination);

export { listFailureTypesUseCase };