import type {Institution} from "@/domain/entities/institution.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";

interface InstitutionRepository {
    list(pagination: Pagination): Promise<PaginationResponse<Institution>>;
}

export type { InstitutionRepository };