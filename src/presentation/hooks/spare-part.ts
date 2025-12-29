import type {Pagination} from "@/domain/models/pagination.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {SparePartRepository} from "@/dependencies.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import {listSparePartsUseCase, updateSparePartsUseCase} from "@/domain/useCases/spare-part.ts";
import type {SparePartUpdate} from "@/domain/models/spare-parts.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

const useSpareParts = (pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting) => {
    return useQuery({
        queryKey: ['spare-parts', pagination, filters, sorting],
        queryFn: () => listSparePartsUseCase(SparePartRepository)(pagination, filters, sorting),
    })
}

const useUpdateSparePart = () => {
    return useMutation<SparePart, unknown, SparePartUpdate, unknown>({
        mutationFn: (data) => updateSparePartsUseCase(SparePartRepository)(data),
    });
}

export { useSpareParts, useUpdateSparePart };