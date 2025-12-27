import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

interface SparePartRepository {
    list(pagination: Pagination, filters: SparePartFilters): Promise<PaginationResponse<SparePart>>;
}

export type { SparePartRepository };