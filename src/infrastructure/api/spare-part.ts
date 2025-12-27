import type { SparePartRepository as SparePartRepositoryInterface } from "@/domain/repositories/spare-part.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";

class SparePartRepository implements SparePartRepositoryInterface {
    async list(pagination: Pagination, filters: SparePartFilters): Promise<PaginationResponse<SparePart>> {
        const response = await fetch(Endpoints.spareParts.list(pagination, filters));
        return await response.json()
    }
}

export { SparePartRepository };