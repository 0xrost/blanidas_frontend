import type {ListQuery} from "@/domain/list-query.ts";

type FailureTypeSortBy = "name";
interface FailureTypeFilters { name?: string }

type FailureTypeListQuery = ListQuery<FailureTypeFilters, FailureTypeSortBy>

export type {
    FailureTypeListQuery,
    FailureTypeFilters,
    FailureTypeSortBy
}