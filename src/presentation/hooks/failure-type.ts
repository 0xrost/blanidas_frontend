import type {Pagination} from "@/domain/models/pagination.ts";
import {useQuery} from "@tanstack/react-query";
import {FailureTypeRepository} from "@/dependencies.ts";
import {listFailureTypesUseCase} from "@/domain/useCases/failure-type.ts";

const useFailureTypes = (pagination: Pagination) => {
    return useQuery({
        queryKey: ['failure-types', pagination],
        queryFn: () => listFailureTypesUseCase(FailureTypeRepository)(pagination),
    })
}

export { useFailureTypes };