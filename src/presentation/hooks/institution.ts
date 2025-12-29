import {useQuery} from "@tanstack/react-query";
import {InstitutionRepository} from "@/dependencies.ts";
import {listInstitutionsUseCase} from "@/domain/useCases/institution.ts";
import type {Pagination} from "@/domain/models/pagination.ts";

const useInstitutions = (pagination: Pagination) => {
    return useQuery({
        queryKey: ['institutions', pagination],
        queryFn: () => listInstitutionsUseCase(InstitutionRepository)(pagination),
    })
}

export { useInstitutions };