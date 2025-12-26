interface Pagination {
    page: number;
    limit: number;
}

interface PaginationResponse<T> {
    page: number;
    limit: number;
    total: number;
    pages: number;
    items: T[];
    hasNext: boolean;
    hasPrev: boolean;

}

export type { Pagination, PaginationResponse };