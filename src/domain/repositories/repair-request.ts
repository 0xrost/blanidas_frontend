import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequestFilters, RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";

interface RepairRequestRepository extends CRUDRepository<
    RepairRequest,
    RepairRequestCreate,
    RepairRequestUpdate,
    RepairRequestFilters,
    RepairRequestSortBy
> {
    get(id: string): Promise<RepairRequest>;
}

export type { RepairRequestRepository };