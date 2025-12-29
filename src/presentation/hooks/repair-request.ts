import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import {RepairRequestRepository} from "@/dependencies.ts";
import {useMutation, useQuery, type UseQueryOptions} from "@tanstack/react-query";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {
    createRepairRequestUseCase, deleteRepairRequestUseCase,
    getRepairRequestUseCase,
    listRepairRequests,
    updateRepairRequestUseCase
} from "@/domain/useCases/repair-request.ts";
import type {Pagination} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestSorting} from "@/domain/query/repair-request.query.ts";

const useCreateRepairRequest = () => {
    return useMutation<RepairRequest, unknown, RepairRequestCreate, unknown>({
        mutationFn: (data) => createRepairRequestUseCase(RepairRequestRepository)(data),
    });
}

const useRepairRequests = (pagination: Pagination, filters: RepairRequestFilters, sorting: RepairRequestSorting) => {
    return useQuery({
        queryKey: ['repair-requests', pagination, filters, sorting],
        queryFn: () => listRepairRequests(RepairRequestRepository)(pagination, filters, sorting),
    })
}

const useRepairRequestById = (id: string) => {
    return useQuery({
        queryKey: ['repair-request', id],
        queryFn: () => getRepairRequestUseCase(RepairRequestRepository)(id),
    })
}

const useUpdateRepairRequest = () => {
    return useMutation<RepairRequest, unknown, RepairRequestUpdate, unknown>({
        mutationFn: (data) => updateRepairRequestUseCase(RepairRequestRepository)(data),
    });
}

const useDeleteRepairRequest = () => {
    return useMutation<null, unknown, string, unknown>({
        mutationFn: (id) => deleteRepairRequestUseCase(RepairRequestRepository)(id),
    });
}

export { useCreateRepairRequest, useRepairRequests, useRepairRequestById, useUpdateRepairRequest, useDeleteRepairRequest };