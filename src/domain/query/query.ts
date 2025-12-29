type SortOrder = 'asc' | 'desc';
interface Sorting<T> {
    sortBy: T;
    sortOrder: SortOrder;
}

export type { SortOrder, Sorting };
