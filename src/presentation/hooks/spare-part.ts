import type {Pagination} from "@/domain/models/pagination.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {SparePartRepository} from "@/dependencies.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import {
    createSparePartUseCase,
    deleteSparePartUseCase,
    listSparePartsUseCase,
    updateSparePartUseCase
} from "@/domain/useCases/spare-part.ts";
import type {SparePartCreate, SparePartUpdate} from "@/domain/models/spare-parts.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

const useSpareParts = (pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting) => {
    return useQuery({
        queryKey: ['spare-parts', pagination, filters, sorting],
        queryFn: () => listSparePartsUseCase(SparePartRepository)(pagination, filters, sorting),
    })
}

const useUpdateSparePart = () => {
    return useMutation<SparePart, unknown, SparePartUpdate, unknown>({
        mutationFn: (data) => updateSparePartUseCase(SparePartRepository)(data),
    });
}

const useCreateSparePart = () => {
    return useMutation<SparePart, unknown, SparePartCreate, unknown>({
        mutationFn: (data) => createSparePartUseCase(SparePartRepository)(data),
    });
}

const useDeleteSparePart = () => {
    return useMutation<null, unknown, string, unknown>({
        mutationFn: (data) => deleteSparePartUseCase(SparePartRepository)(data),
    });
}

export {
    useSpareParts,
    useUpdateSparePart,
    useCreateSparePart,
    useDeleteSparePart,
};