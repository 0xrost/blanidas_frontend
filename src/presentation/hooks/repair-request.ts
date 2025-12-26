import type {CreateRepairRequest} from "@/domain/models/repair-request.ts";
import {RepairRequestRepository} from "@/dependencies.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import {createRepairRequest, getRepairRequestUseCase, listRepairRequest} from "@/domain/useCases/repair-request.ts";
import type {Pagination} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";

const useCreateRepairRequest = () => {
    return useMutation<RepairRequest, unknown, CreateRepairRequest, unknown>({
        mutationFn: createRepairRequest(RepairRequestRepository),
    });
}

const useListRepairRequest = (pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy) => {
    return useQuery({
        queryKey: ['list-repair-request', pagination, filters, orderBy],
        queryFn: () => listRepairRequest(RepairRequestRepository)(pagination, filters, orderBy),
    })
}

const useGetRepairRequest = (id: string) => {
    return useQuery({
        queryKey: ['repair-request', id],
        queryFn: () => getRepairRequestUseCase(RepairRequestRepository)(id),
    })
}

export { useCreateRepairRequest, useListRepairRequest, useGetRepairRequest };