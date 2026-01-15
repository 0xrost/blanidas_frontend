import {useMemo} from "react";
import type {CategoricalChartDataItem} from "@/domain/entities/statistics.ts";

const useNameValueChartData = (data: CategoricalChartDataItem[]) => {
    return useMemo<{name: string, value: number}[]>(() => {
        return data.map(data => ({name: data.label, value: data.value}))
    }, [data]);
};

export { useNameValueChartData };