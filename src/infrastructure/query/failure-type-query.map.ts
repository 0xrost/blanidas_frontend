import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {FailureTypeFilters, FailureTypeSortBy} from "@/domain/queries/failure-type.ts";

const failureTypeFilterMap: Record<keyof FailureTypeFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const failureTypeSortMap: Record<FailureTypeSortBy, string> = { name: "name" };

export { failureTypeFilterMap, failureTypeSortMap };