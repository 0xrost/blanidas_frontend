import type {StockStatus} from "@/domain/entities/spare-part.ts";
import type {ListQuery} from "@/domain/list-query.ts";

type SparePartSortBy = "quantity" | "name" | "status";
interface SparePartFilters {
    name?: string
    institutionId?: string
    categoryId?: string
    modelId?: string
    status?: StockStatus
}

type SparePartListQuery = ListQuery<SparePartFilters, SparePartSortBy>;

export type {
    SparePartListQuery,
    SparePartFilters,
    SparePartSortBy,
};