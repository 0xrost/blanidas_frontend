import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {SparePartCreate, SparePartUpdate} from "@/domain/models/spare-parts.ts";

interface SparePartsRepository {
    list(pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting): Promise<PaginationResponse<SparePart>>;

    update(data: SparePartUpdate): Promise<SparePart>;
    create(data: SparePartCreate): Promise<SparePart>;
    delete(id: string): Promise<null>;
}

export type { SparePartsRepository };