import type {CategoricalChartDataItem, TimeLinePoint, TimeStep} from "@/domain/entities/statistics.ts";

interface TimeFrameDto {
    from_data: Date;
    to_data: Date;
    step: TimeStep;
}

interface EquipmentBreakdownItemDto {
    serial_number: string;
    model_name: string;
    institution_name: string;
    breakdown_count: number;
    average_repair_seconds: number;
}

interface StatisticsDto {
    time_frame: TimeFrameDto;
    institution_breakdown: CategoricalChartDataItem[];
    time_dynamics: TimeLinePoint[];
    failure_types: CategoricalChartDataItem[];

    model_breakdowns: CategoricalChartDataItem[];
    average_repair_time: CategoricalChartDataItem[];
    equipment_breakdowns: EquipmentBreakdownItemDto[];
    used_spare_parts: CategoricalChartDataItem[];
}

export type {
    StatisticsDto,
    TimeFrameDto,
    EquipmentBreakdownItemDto,
}