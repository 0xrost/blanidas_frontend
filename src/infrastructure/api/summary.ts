import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";
import type {RepairRequestsSummary, SparePartsSummary} from "@/domain/entities/summary.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapRepairRequestSummaryDtoToDomain, mapSparePartsSummaryDtoToDomain} from "@/infrastructure/mappers/summary.ts";

class SummaryRepository implements SummaryRepositoryInterface {
    async getRepairRequests(): Promise<RepairRequestsSummary> {
        const response = await fetch(Endpoints.summary.getRepairRequests());
        return mapRepairRequestSummaryDtoToDomain(await response.json())
    }

    async getSpareParts(): Promise<SparePartsSummary> {
        const response = await fetch(Endpoints.summary.getSpareParts());
        return mapSparePartsSummaryDtoToDomain(await response.json())
    }
}

export { SummaryRepository };