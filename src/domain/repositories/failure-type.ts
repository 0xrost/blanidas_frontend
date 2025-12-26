import type {Pagination} from "@/domain/models/pagination.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";

interface FailureTypeRepository {
    list(pagination: Pagination): Promise<FailureType[]>;
}

export type { FailureTypeRepository };