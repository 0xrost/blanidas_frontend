import type {Statistics} from "@/domain/entities/statistics.ts";
import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";

interface StatisticsRepository {
    getStatistics(query: Partial<StatisticsQuery>): Promise<Statistics>;
    download(): Promise<Blob>;
}

export type { StatisticsRepository };
