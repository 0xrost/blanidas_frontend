import type {RepairRequestRepository} from "@/domain/repositories/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/query/repair-request.query.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {InvalidPageNumberError} from "@/domain/errors.ts";

const listRepairRequests =
    (repo: RepairRequestRepository) =>
        async (pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy): Promise<PaginationResponse<RepairRequest>> => {
            if (pagination.page < 1) throw new InvalidPageNumberError(pagination.page);
            return await repo.list(pagination, filters, orderBy);
        }

const getRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (id: string) => await repo.get(id);

const createRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (command: RepairRequestCreate) =>
            await repo.create(command);

const updateRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (command: RepairRequestUpdate) =>
            await repo.update(command);

const deleteRepairRequestUseCase =
    (repo: RepairRequestRepository) =>
        async (id: string) => await repo.delete(id);

export { createRepairRequestUseCase , listRepairRequests, getRepairRequestUseCase, updateRepairRequestUseCase, deleteRepairRequestUseCase };
