import {useQuery} from "@tanstack/react-query";
import {
    getEquipmentSummaryUseCase,
    getRepairRequestsSummaryUseCase,
    getSparePartsSummaryUseCase,
} from "@/domain/useCases/summary.ts";
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


const useEquipmentSummary = () => {
    return useQuery({
        queryKey: ['summary', "equipment"],
        queryFn: getEquipmentSummaryUseCase(SummaryRepository),
    })
}


export {
    useRepairRequestsSummary,
    useSparePartsSummary,
    useEquipmentSummary,
};