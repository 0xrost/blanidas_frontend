import {useQuery} from "@tanstack/react-query";
import {InstitutionRepository} from "@/dependencies.ts";
import {listInstitution} from "@/domain/useCases/institution.ts";

const useListInstitution = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['institutions', page, limit],
        queryFn: () => listInstitution(InstitutionRepository)(page, limit),
    })
}

export { useListInstitution };