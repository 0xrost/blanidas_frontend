import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequestFilters, RepairRequestSorting} from "@/domain/query/repair-request.query.ts";

interface RepairRequestRepository {
    list(pagination: Pagination, filters: RepairRequestFilters, sorting: RepairRequestSorting): Promise<PaginationResponse<RepairRequest>>;
    get(id: string): Promise<RepairRequest>;

    create(data: RepairRequestCreate): Promise<RepairRequest>;
    update(data: RepairRequestUpdate): Promise<RepairRequest>;
    delete(id: string): Promise<null>;
}

export type { RepairRequestRepository };