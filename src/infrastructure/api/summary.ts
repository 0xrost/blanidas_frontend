import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";
import type {
    EquipmentSummary,
    RepairRequestsSummary,
    SparePartsSummary,
} from "@/domain/entities/summary.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {
    mapEquipmentSummaryDtoToDomain,
    mapRepairRequestSummaryDtoToDomain,
    mapSparePartsSummaryDtoToDomain
} from "@/infrastructure/mappers/summary.ts";
import {fetchWithAuth} from "@/infrastructure/fetch.ts";

class SummaryRepository implements SummaryRepositoryInterface {
    async getRepairRequests(): Promise<RepairRequestsSummary> {
        const response = await fetchWithAuth(Endpoints.summary.getRepairRequests());
        return mapRepairRequestSummaryDtoToDomain(await response.json())
    }

    async getSpareParts(): Promise<SparePartsSummary> {
        const response = await fetchWithAuth(Endpoints.summary.getSpareParts());
        return mapSparePartsSummaryDtoToDomain(await response.json())
    }

    async getEquipment(): Promise<EquipmentSummary> {
        const response = await fetchWithAuth(Endpoints.summary.getEquipment());
        return mapEquipmentSummaryDtoToDomain(await response.json())
    }
}

export { SummaryRepository };