import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";
import {statisticsQueryMap, timeFrameQueryMap} from "@/infrastructure/query/statistics-query.map.ts";
import type {TimeFrame} from "@/domain/entities/statistics.ts";

const statisticsBuildQueries = (query: Partial<StatisticsQuery>): URLSearchParams => {
    const queries = new URLSearchParams();

    for (const key in query) {
        const queryKey = key as keyof StatisticsQuery;
        if (queryKey == "timeFrame") continue;

        query[queryKey]?.forEach(value => {
            queries.append(statisticsQueryMap[queryKey], value);
        })
    }

    for (const key in query["timeFrame"]) {
        const queryKey = key as keyof TimeFrame;
        const rowValue = query["timeFrame"][queryKey];
        let value = rowValue.toString();
        console.log(rowValue)
        if ((queryKey == "toDate" || queryKey == "fromDate") && rowValue instanceof Date) {
            value = rowValue.toISOString();
        }

        queries.set(timeFrameQueryMap[queryKey], value);
    }

    return queries;
}

export { statisticsBuildQueries };