import type {RepairRequestSummaryDto, SparePartsSummaryDto} from "@/infrastructure/dto/summary.ts";
import type {RepairRequestsSummary, SparePartsSummary} from "@/domain/entities/summary.ts";

const mapRepairRequestSummaryDtoToDomain = (dto: RepairRequestSummaryDto): RepairRequestsSummary => {
    return {
        inProgress: dto.in_progress,
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
    };
};

export {
    mapRepairRequestSummaryDtoToDomain,
    mapSparePartsSummaryDtoToDomain,
};