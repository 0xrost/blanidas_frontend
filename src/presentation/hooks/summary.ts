import {useQuery} from "@tanstack/react-query";
import {getRepairRequestsSummaryUseCase, getSparePartsSummaryUseCase} from "@/domain/useCases/summary.ts";
import {SummaryRepository} from "@/dependencies.ts";

const useRepairRequestsSummary = () => {
    return useQuery({
        queryKey: ['summary', "repair-requests"],
        queryFn: getRepairRequestsSummaryUseCase(SummaryRepository),
    })
}

const useSparePartsSummary = () => {
    return useQuery({
        queryKey: ['summary', "spare-parts"],
        queryFn: getSparePartsSummaryUseCase(SummaryRepository),
    })
}


export {
    useRepairRequestsSummary,
    useSparePartsSummary,
};