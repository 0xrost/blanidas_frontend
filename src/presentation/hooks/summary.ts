import {useQuery} from "@tanstack/react-query";
import {
    getInstitutionsSummaryUseCase,
    getRepairRequestsSummaryUseCase,
    getSparePartsSummaryUseCase,
    getStaffSummaryUseCase
} from "@/domain/useCases/summary.ts";
import {SummaryRepository} from "@/dependencies.ts";

const useRepairRequestsSummary = () => {
    return useQuery({
        queryKey: ['summary', "repair-requests"],
        queryFn: getRepairRequestsSummaryUseCase(SummaryRepository),
    })
}

const useInstitutionsSummary = () => {
    return useQuery({
        queryKey: ['summary', "institutions"],
        queryFn: getInstitutionsSummaryUseCase(SummaryRepository),
    })
}

const useSparePartsSummary = () => {
    return useQuery({
        queryKey: ['summary', "spare-parts"],
        queryFn: getSparePartsSummaryUseCase(SummaryRepository),
    })
}

const useStaffSummary = () => {
    return useQuery({
        queryKey: ['summary', "staff"],
        queryFn: getStaffSummaryUseCase(SummaryRepository),
    })
}


export {
    useRepairRequestsSummary,
    useInstitutionsSummary,
    useSparePartsSummary,
    useStaffSummary,
};