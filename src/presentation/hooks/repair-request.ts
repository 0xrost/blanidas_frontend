import type {CreateRepairRequest, UpdateRepairRequest} from "@/domain/models/repair-request.ts";
import {RepairRequestRepository} from "@/dependencies.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {
    createRepairRequest, deleteRepairRequestUseCase,
    getRepairRequestUseCase,
    listRepairRequest,
    updateRepairRequestUseCase
} from "@/domain/useCases/repair-request.ts";
import type {Pagination} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";

const useCreateRepairRequest = () => {
    return useMutation<RepairRequest, unknown, CreateRepairRequest, unknown>({
        mutationFn: createRepairRequest(RepairRequestRepository),
    });
}

const useListRepairRequest = (pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['list-repair-request', pagination, filters, orderBy],
        queryFn: () => listRepairRequest(RepairRequestRepository)(pagination, filters, orderBy),
        enabled: enabled,
    })
}

const useGetRepairRequest = (id: string) => {
    return useQuery({
        queryKey: ['repair-request', id],
        queryFn: () => getRepairRequestUseCase(RepairRequestRepository)(id),

    })
}

const useUpdateRepairRequest = () => {
    return useMutation<RepairRequest, unknown, UpdateRepairRequest, unknown>({
        mutationFn: (command) => updateRepairRequestUseCase(RepairRequestRepository)(command),
    });
}

const useDeleteRepairRequest = () => {
    return useMutation<null, unknown, string, unknown>({
        mutationFn: (id) => deleteRepairRequestUseCase(RepairRequestRepository)(id),
    });
}

export { useCreateRepairRequest, useListRepairRequest, useGetRepairRequest, useUpdateRepairRequest, useDeleteRepairRequest };