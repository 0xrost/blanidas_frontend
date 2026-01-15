type TimeStep = "day" | "week" | "month" | "year";

interface TimeFrame {
    fromDate: Date;
    toDate: Date;
    step: TimeStep;
}

interface CategoricalChartDataItem {
    label: string;
    value: number;
}

interface TimeLinePoint {
    period: Date;
    count: number;
}

interface EquipmentBreakdownItem {
    serialNumber: string;
    modelName: string;
    institutionName: string;
    breakdownCount: number;
    averageRepairSeconds: number;
}

interface Statistics {
    timeFrame: TimeFrame;
    institutionBreakdown: CategoricalChartDataItem[];
    timeDynamics: TimeLinePoint[];
    failureTypes: CategoricalChartDataItem[];

    modelBreakdowns: CategoricalChartDataItem[];
    averageRepairTime: CategoricalChartDataItem[];
    equipmentBreakdowns: EquipmentBreakdownItem[];
    usedSpareParts: CategoricalChartDataItem[];
}

export type {
    Statistics,
    TimeStep,
    TimeFrame,
    EquipmentBreakdownItem,
    TimeLinePoint,
    CategoricalChartDataItem,
}