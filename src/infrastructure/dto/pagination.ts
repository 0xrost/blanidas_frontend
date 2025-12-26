interface PaginationResponseDTO<T> {
    page: number;
    limit: number;
    total: number;
    pages: number;
    items: T[];
    has_next: boolean;
    has_prev: boolean;
}

export type { PaginationResponseDTO };