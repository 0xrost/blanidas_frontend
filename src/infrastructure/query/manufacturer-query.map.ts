import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {ManufacturerFilters, ManufacturerSortBy} from "@/domain/queries/manufacturer-list.query.ts";

const manufacturerFilterMap: Record<keyof ManufacturerFilters, FilterDefinition> = {
    name: {
        field: "name",
        operator: "ilike",
    }
};

const manufacturerSortMap: Record<ManufacturerSortBy, string> = { name: "name" };

export { manufacturerFilterMap, manufacturerSortMap };