import type {TimeFrame} from "@/domain/entities/statistics.ts";

interface StatisticsQuery {
    timeFrame: TimeFrame;
    institutionIds: string[];
    equipmentModelIds: string[];
    failureTypeIds: string[];
}

export type { StatisticsQuery };