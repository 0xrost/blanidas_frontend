import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";
import type {RepairRequestSummary} from "@/domain/entities/summary.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapApiRepairRequestSummary} from "@/infrastructure/mappers/summary.ts";

class SummaryRepository implements SummaryRepositoryInterface {
    async getRepairRequest(): Promise<RepairRequestSummary> {
        const response = await fetch(Endpoints.summary.getRepairRequest());
        return mapApiRepairRequestSummary(await response.json())
    }
}

export { SummaryRepository };