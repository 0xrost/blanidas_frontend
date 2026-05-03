import type {EquipmentSummaryDto, RepairRequestSummaryDto, SparePartsSummaryDto} from "@/infrastructure/dto/summary.ts";
import type {EquipmentSummary, RepairRequestsSummary, SparePartsSummary} from "@/domain/entities/summary.ts";

const mapRepairRequestSummaryDtoToDomain = (dto: RepairRequestSummaryDto): RepairRequestsSummary => {
    return {
        all: dto.all,
        inProgress: dto.in_progress,
        waitingEngineer: dto.waiting_engineer,
        finished: dto.finished,
        waitingSpareParts: dto.waiting_spare_parts,
        new: dto.new,
    };
};

const mapSparePartsSummaryDtoToDomain = (dto: SparePartsSummaryDto): SparePartsSummary => {
    return {
        total: dto.total,
        inStock: dto.in_stock,
        lowStock: dto.low_stock,
        outOfStock: dto.out_of_stock,
        new: dto.new,
        restored: dto.restored,
    };
};

const mapEquipmentSummaryDtoToDomain = (dto: EquipmentSummaryDto): EquipmentSummary => {
    return {
        total: dto.total,
        notWorking: dto.not_working,
        underMaintenance: dto.under_maintenance,
        working: dto.working,
    };
};

export {
    mapRepairRequestSummaryDtoToDomain,
    mapSparePartsSummaryDtoToDomain,
    mapEquipmentSummaryDtoToDomain,
};