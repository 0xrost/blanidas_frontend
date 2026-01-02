import type {
    InstitutionsSummary,
    RepairRequestsSummary,
    SparePartsSummary,
    StaffSummary
} from "@/domain/entities/summary.ts";

interface SummaryRepository {
    getRepairRequests(): Promise<RepairRequestsSummary>;
    getInstitutions(): Promise<InstitutionsSummary>;
    getSpareParts(): Promise<SparePartsSummary>;
    getStaff(): Promise<StaffSummary>;
}

export type { SummaryRepository };