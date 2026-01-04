import type {SummaryRepository} from "@/domain/repositories/summary.ts";

const getRepairRequestsSummaryUseCase =
    (repo: SummaryRepository) =>
        async () => repo.getRepairRequests();

const getSparePartsSummaryUseCase =
    (repo: SummaryRepository) =>
        async () => repo.getSpareParts();

const getStaffSummaryUseCase =
    (repo: SummaryRepository) =>
        async () => repo.getStaff();

const getInstitutionsSummaryUseCase =
    (repo: SummaryRepository) =>
        async () => repo.getInstitutions();

const getEquipmentSummaryUseCase =
    (repo: SummaryRepository) =>
        async () => repo.getEquipment();

export {
    getRepairRequestsSummaryUseCase,
    getInstitutionsSummaryUseCase,
    getSparePartsSummaryUseCase,
    getStaffSummaryUseCase,
    getEquipmentSummaryUseCase,
};