import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";

interface SparePartCategoriesRepository {
    list(pagination: Pagination, sorting: SparePartCategoriesSorting): Promise<PaginationResponse<SparePartCategory>>;
}

export type { SparePartCategoriesRepository };

