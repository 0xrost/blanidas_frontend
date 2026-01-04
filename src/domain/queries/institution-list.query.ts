import type {ListQuery} from "@/domain/list-query.ts";

type InstitutionSortBy = "name";
interface InstitutionFilters {
    nameOrAddress?: string;
    typeId?: string;
}

type InstitutionListQuery = ListQuery<InstitutionFilters, InstitutionSortBy>

export type {
    InstitutionListQuery,
    InstitutionFilters,
    InstitutionSortBy
}