import {RepairRequestRepository} from "@/dependencies.ts";
import {
    createRepairRequestUseCase, deleteRepairRequestUseCase,
    listRepairRequestsUseCase,
    updateRepairRequestUseCase
} from "@/domain/useCases/repair-request.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";

const repairRequestHooks = createCrudHooks(
    "repair-request",
    listRepairRequestsUseCase(RepairRequestRepository),
    createRepairRequestUseCase(RepairRequestRepository),
    updateRepairRequestUseCase(RepairRequestRepository),
    deleteRepairRequestUseCase(RepairRequestRepository)
);

const useRepairRequests = repairRequestHooks.useList;
const useCreateRepairRequest = repairRequestHooks.useCreate;
const useUpdateRepairRequest = repairRequestHooks.useUpdate;
const useDeleteRepairRequest = repairRequestHooks.useDelete;

export {
    useRepairRequests,
    useCreateRepairRequest,
    useUpdateRepairRequest,
    useDeleteRepairRequest,
};