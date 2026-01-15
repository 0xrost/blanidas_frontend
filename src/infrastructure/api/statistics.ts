import type {StatisticsRepository as StatisticsRepositoryInterface} from "@/domain/repositories/statistics.ts";
import type {Statistics} from "@/domain/entities/statistics.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {CRUDRepository} from "@/infrastructure/api/general.ts";
import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";
import type {StatisticsDto} from "@/infrastructure/dto/statistics.ts";
import {mapStatisticsDtoToDomain} from "@/infrastructure/mappers/statistics.ts";
import {fetchWithAuth} from "@/infrastructure/fetch.ts";


class StatisticsRepository implements StatisticsRepositoryInterface {
    async getStatistics(query: StatisticsQuery): Promise<Statistics> {
        const json = await CRUDRepository.request<StatisticsDto>(Endpoints.statistics.get(query));
        return mapStatisticsDtoToDomain(json);
    }

    async download(): Promise<Blob> {
        const response = await fetchWithAuth(Endpoints.statistics.download());
        if (!response.ok) {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }

        return response.blob();
    }
}

export { StatisticsRepository };