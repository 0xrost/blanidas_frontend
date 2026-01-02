type SortOrder = 'asc' | 'desc';
interface Sorting<T extends string = string> {
    sortBy: T;
    sortOrder: SortOrder;
}

const SortByNameAsc = { sortBy: "name", sortOrder: "asc" } as Sorting<"name">;

export type { SortOrder, Sorting };
export { SortByNameAsc };