import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequestFilters, RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";
import type {RepairRequestRepository} from "@/domain/repositories/repair-request.ts";

const RepairRequestUseCases = createCrudUseCases<
    RepairRequest,
    RepairRequestCreate,
    RepairRequestUpdate,
    RepairRequestFilters,
    RepairRequestSortBy,
    RepairRequestRepository
>();

export const {
    list: listRepairRequestsUseCase,
    create: createRepairRequestUseCase,
    update: updateRepairRequestUseCase,
    delete: deleteRepairRequestUseCase
} = RepairRequestUseCases;