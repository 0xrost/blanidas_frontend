import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {InstitutionFilters, InstitutionSortBy} from "@/domain/queries/institution-list.query.ts";

const institutionFilterMap: Record<keyof InstitutionFilters, FilterDefinition> = {
    nameOrAddress: {
        field: "name__or__address",
        operator: "ilike",
    },
    categoryId: {
        field: "category_id",
        operator: "eq",
    },
};

const institutionSortMap: Record<InstitutionSortBy, string> = { name: "name" };

export { institutionFilterMap, institutionSortMap };