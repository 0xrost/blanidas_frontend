import type {ListQuery} from "@/domain/list-query.ts";

type InstitutionTypeSortBy = "name";
interface InstitutionTypeFilters { name?: string }

type InstitutionTypeListQuery = ListQuery<InstitutionTypeFilters, InstitutionTypeSortBy>;

export type {
    InstitutionTypeListQuery,
    InstitutionTypeSortBy,
    InstitutionTypeFilters
}