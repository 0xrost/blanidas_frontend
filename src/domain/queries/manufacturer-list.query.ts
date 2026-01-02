import type {ListQuery} from "@/domain/list-query.ts";

type ManufacturerSortBy = "name";
interface ManufacturerFilters { name?: string }

type ManufacturerListQuery = ListQuery<ManufacturerFilters, ManufacturerSortBy>;

export type {
    ManufacturerListQuery,
    ManufacturerSortBy,
    ManufacturerFilters
}