import type {Sorting} from "@/domain/query/query.ts";
import type {SparePartStatus} from "@/domain/entities/spare-part.ts";

type SparePartsSortBy = "quantity" | "name" | "status";
type SparePartsSorting = Sorting<SparePartsSortBy>;

interface SparePartsFilters {
    name?: string
    institution?: string
    categoryId?: string
    modelId?: string
    status?: SparePartStatus
}

export type {
    SparePartsFilters,
    SparePartsSorting,
    SparePartsSortBy,
};