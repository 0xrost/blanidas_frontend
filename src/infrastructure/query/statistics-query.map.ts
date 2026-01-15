import type {StatisticsQuery} from "@/domain/queries/statistics.query.ts";
import type {TimeFrame} from "@/domain/entities/statistics.ts";

const statisticsQueryMap: Record<keyof StatisticsQuery, string> = {
    equipmentModelIds: "equipment_model_ids",
    failureTypeIds: "failure_type_ids",
    institutionIds: "institution_ids",
    timeFrame: "",
}

const timeFrameQueryMap: Record<keyof TimeFrame, string> = {
    step: "step",
    fromDate: "from_date",
    toDate: "to_date",
}

export {
    statisticsQueryMap,
    timeFrameQueryMap,
}