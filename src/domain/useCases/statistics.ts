import type {StatisticsRepository} from "@/domain/repositories/statistics.ts";
import type {Statistics} from "@/domain/entities/statistics.ts";
import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";

const getStatisticsUseCase = (repo: StatisticsRepository) => {
    return async (query: Partial<StatisticsQuery>): Promise<Statistics> => {
        return await repo.getStatistics(query);
    }
}

const downloadStatisticsUseCase = (repo: StatisticsRepository) => {
    return async (): Promise<Blob> => {
        return await repo.download();
    }
}

export {
    getStatisticsUseCase,
    downloadStatisticsUseCase
};