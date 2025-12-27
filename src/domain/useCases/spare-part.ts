import type {SparePartRepository} from "@/domain/repositories/spare-part.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

const listSparePartUseCase =
    (repo: SparePartRepository) =>
        async (pagination: Pagination, filters: SparePartFilters): Promise<PaginationResponse<SparePart>> =>
            await repo.list(pagination, filters);

export { listSparePartUseCase };