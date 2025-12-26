import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {CreateRepairRequest, UpdateRepairRequest} from "@/domain/models/repair-request.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";

interface RepairRequestRepository {
    create(command: CreateRepairRequest): Promise<RepairRequest>;
    update(command: UpdateRepairRequest): Promise<RepairRequest>;
    list(pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy): Promise<PaginationResponse<RepairRequest>>;
    get(id: string): Promise<RepairRequest>;
}

export type { RepairRequestRepository };