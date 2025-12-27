import type {Pagination} from "@/domain/models/pagination.ts";
import {useQuery} from "@tanstack/react-query";
import {SparePartRepository} from "@/dependencies.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";
import {listSparePartUseCase} from "@/domain/useCases/spare-part.ts";

type Options = {
    enabled?: boolean;
}

const useListSpareParts = (pagination: Pagination, filters: SparePartFilters,options: Options | null = null) => {
    return useQuery({
        queryKey: ['spare-parts', pagination, filters],
        queryFn: () => listSparePartUseCase(SparePartRepository)(pagination, filters),
        ...options,

    })
}

export { useListSpareParts };