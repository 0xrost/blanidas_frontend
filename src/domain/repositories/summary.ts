import type {RepairRequestsSummary, SparePartsSummary} from "@/domain/entities/summary.ts";

interface SummaryRepository {
    getRepairRequests(): Promise<RepairRequestsSummary>;
    getSpareParts(): Promise<SparePartsSummary>;
}

export type { SummaryRepository };