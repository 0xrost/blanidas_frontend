import type {RepairRequestSummaryDTO} from "@/infrastructure/dto/summary.ts";
import type {RepairRequestSummary} from "@/domain/entities/summary.ts";

const mapApiRepairRequestSummary = (api: RepairRequestSummaryDTO): RepairRequestSummary => {
    return {
        inProgress: api.in_progress,
        finished: api.finished,
        waitingSpareParts: api.waiting_spare_parts,
        new: api.new,
    }
}

export { mapApiRepairRequestSummary };