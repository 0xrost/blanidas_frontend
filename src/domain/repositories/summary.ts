import type {
    EquipmentSummary,
    RepairRequestsSummary,
    SparePartsSummary,
} from "@/domain/entities/summary.ts";

interface SummaryRepository {
    getRepairRequests(): Promise<RepairRequestsSummary>;
    getSpareParts(): Promise<SparePartsSummary>;
    getEquipment(): Promise<EquipmentSummary>;
}

export type { SummaryRepository };