import {useQuery} from "@tanstack/react-query";
import getRepairRequestSummary from "@/domain/useCases/summary.ts";
import {SummaryRepository} from "@/dependencies.ts";

const useRepairRequestSummary = () => {
    return useQuery({
        queryKey: ['summary', "repair-request"],
        queryFn: getRepairRequestSummary(SummaryRepository),
    })
}

export default useRepairRequestSummary;