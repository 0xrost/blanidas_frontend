import {useQuery} from "@tanstack/react-query";
import {StatisticsRepository} from "@/dependencies.ts";
import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";
import {downloadStatisticsUseCase, getStatisticsUseCase} from "@/domain/useCases/statistics.ts";

const useStatistics = (query: Partial<StatisticsQuery>) => {
    return useQuery({
        queryKey: ['statistics', query],
        queryFn: () => getStatisticsUseCase(StatisticsRepository)(query),
        gcTime: 0,
    });
};

const useDownloadStatistics = () => {
    return useQuery({
        queryKey: ['statistics-export'],
        queryFn: () => downloadStatisticsUseCase(StatisticsRepository)(),
        enabled: false,
        retry: false,
        gcTime: 0,
    });
};

export {
    useStatistics,
    useDownloadStatistics
};
