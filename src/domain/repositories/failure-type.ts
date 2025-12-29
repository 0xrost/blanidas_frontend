import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";

interface FailureTypeRepository {
    list(pagination: Pagination): Promise<PaginationResponse<FailureType>>;
}

export type { FailureTypeRepository };