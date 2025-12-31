import type {Sorting} from "@/domain/query/query.ts";

type ManufacturerSortBy = "name";
type ManufacturersSorting = Sorting<ManufacturerSortBy>;

interface ManufacturersFilters { name?: string }

export type {
    ManufacturerSortBy,
    ManufacturersSorting,
    ManufacturersFilters
}