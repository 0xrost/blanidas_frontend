interface RepairRequestSummaryDto {
    new: number;
    in_progress: number;
    waiting_spare_parts: number;
    finished: number;
}

interface SparePartsSummaryDto {
    total: number;
    in_stock: number;
    low_stock: number;
    out_of_stock: number;
}

export type {
    RepairRequestSummaryDto,
    SparePartsSummaryDto,
};