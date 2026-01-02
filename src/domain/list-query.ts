import type {Sorting} from "@/domain/sorting.ts";
import type {Pagination} from "@/domain/pagination.ts";

interface ListQuery<TFilters, TSortBy extends string = string> {
    pagination: Pagination;
    filters?: TFilters;
    sorting?: Sorting<TSortBy>;
}

export type { ListQuery };