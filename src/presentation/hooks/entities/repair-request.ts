import {EquipmentRepository, RepairRequestRepository} from "@/dependencies.ts";
import {
    createRepairRequestUseCase, deleteRepairRequestUseCase, getRepairRequestUseCase,
    listRepairRequestsUseCase,
    updateRepairRequestUseCase
} from "@/domain/useCases/repair-request.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";
import {useQuery} from "@tanstack/react-query";

const useRepairRequestById = (id: string) => {
    return useQuery({
        queryKey: ['repair-request', id],
        queryFn: () => getRepairRequestUseCase(RepairRequestRepository)(id)
    })
}

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
    useRepairRequestById,
};