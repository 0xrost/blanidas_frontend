import type {ListQuery} from "@/domain/list-query.ts";

type InstitutionSortBy = "name";
interface InstitutionFilters {
    nameOrAddress?: string;
    categoryId?: string;
}

type InstitutionListQuery = ListQuery<InstitutionFilters, InstitutionSortBy>

export type {
    InstitutionListQuery,
    InstitutionFilters,
    InstitutionSortBy
}