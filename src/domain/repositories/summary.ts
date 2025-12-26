import type {RepairRequestSummary} from "@/domain/entities/summary.ts";

interface SummaryRepository {
    getRepairRequest(): Promise<RepairRequestSummary>;
}

export type { SummaryRepository };