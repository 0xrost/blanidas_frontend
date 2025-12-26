import type {RepairRequestRepository} from "@/domain/repositories/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";
import type {CreateRepairRequest, UpdateRepairRequest} from "@/domain/models/repair-request.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";

const createRepairRequest =
    (repo: RepairRequestRepository) =>
        async (command: CreateRepairRequest) => await repo.create(command);

const updateRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (command: UpdateRepairRequest) =>
            await repo.update(command);

const listRepairRequest =
    (repo: RepairRequestRepository) =>
        async (pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy): Promise<PaginationResponse<RepairRequest>> => {
                if (pagination.page < 1) {
                    throw new Error("Page must be >= 1")
                }

                return await repo.list(pagination, filters, orderBy);
            }

const getRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (id: string) => await repo.get(id);

export { createRepairRequest , listRepairRequest, getRepairRequestUseCase, updateRepairRequestUseCase };
