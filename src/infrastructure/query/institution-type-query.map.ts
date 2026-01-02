import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {InstitutionTypeFilters, InstitutionTypeSortBy} from "@/domain/queries/institution-type-list.query.ts";

const institutionTypeFilterMap: Record<keyof InstitutionTypeFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const institutionTypeSortMap: Record<InstitutionTypeSortBy, string> = { name: "name" };

export { institutionTypeSortMap, institutionTypeFilterMap };