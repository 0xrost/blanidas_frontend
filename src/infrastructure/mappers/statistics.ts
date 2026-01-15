import type {EquipmentBreakdownItemDto, StatisticsDto, TimeFrameDto} from "@/infrastructure/dto/statistics.ts";
import type {EquipmentBreakdownItem, Statistics, TimeFrame} from "@/domain/entities/statistics.ts";

const mapTimeFrameDtoToDomain = (dto: TimeFrameDto): TimeFrame => {
    return {
        fromDate: dto.from_data,
        step: dto.step,
        toDate: dto.to_data,
    };
};

const mapEquipmentBreakdownItemDtoToDomain = (dto: EquipmentBreakdownItemDto): EquipmentBreakdownItem => {
    return {
        breakdownCount: dto.breakdown_count,
        averageRepairSeconds: dto.average_repair_seconds,
        institutionName: dto.institution_name,
        modelName: dto.model_name,
        serialNumber: dto.serial_number,
    };
}

const mapStatisticsDtoToDomain = (dto: StatisticsDto): Statistics => {
    return {
        averageRepairTime: dto.average_repair_time,
        failureTypes: dto.failure_types,
        institutionBreakdown: dto.institution_breakdown,
        modelBreakdowns: dto.model_breakdowns,
        timeDynamics: dto.time_dynamics,
        usedSpareParts: dto.used_spare_parts,
        timeFrame: mapTimeFrameDtoToDomain(dto.time_frame),
        equipmentBreakdowns: dto.equipment_breakdowns.map(x => mapEquipmentBreakdownItemDtoToDomain(x)),
    };
};

export {
    mapStatisticsDtoToDomain,
    mapTimeFrameDtoToDomain
}