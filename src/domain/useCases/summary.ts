import type {SummaryRepository} from "@/domain/repositories/summary.ts";

const getRepairRequestSummary =
    (repo: SummaryRepository) =>
        async () => repo.getRepairRequest();

export default getRepairRequestSummary;