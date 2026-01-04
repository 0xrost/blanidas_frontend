import type { SummaryRepository as SummaryRepositoryInterface } from "@/domain/repositories/summary.ts";
import type {
    EquipmentSummary,
    InstitutionsSummary,
    RepairRequestsSummary,
    SparePartsSummary,
    StaffSummary
} from "@/domain/entities/summary.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {
    mapEquipmentSummaryDtoToDomain,
    mapRepairRequestSummaryDtoToDomain,
    mapSparePartsSummaryDtoToDomain
} from "@/infrastructure/mappers/summary.ts";

class SummaryRepository implements SummaryRepositoryInterface {
    async getRepairRequests(): Promise<RepairRequestsSummary> {
        const response = await fetch(Endpoints.summary.getRepairRequests());
        return mapRepairRequestSummaryDtoToDomain(await response.json())
    }

    async getSpareParts(): Promise<SparePartsSummary> {
        const response = await fetch(Endpoints.summary.getSpareParts());
        return mapSparePartsSummaryDtoToDomain(await response.json())
    }

    async getInstitutions(): Promise<InstitutionsSummary> {
        const response = await fetch(Endpoints.summary.getInstitutions());
        return await response.json();
    }

    async getStaff(): Promise<StaffSummary> {
        const response = await fetch(Endpoints.summary.getUsers());
        return await response.json()
    }

    async getEquipment(): Promise<EquipmentSummary> {
        const response = await fetch(Endpoints.summary.getEquipment());
        return mapEquipmentSummaryDtoToDomain(await response.json())
    }
}

export { SummaryRepository };