import type {Pagination} from "@/domain/pagination.ts";
import type {PaginationSearch} from "@/presentation/models.ts";

const useOnPaginationChange = <T>(changeSearch: (fn: (prev: T & PaginationSearch) => T & PaginationSearch) => void) => {
    return (pagination: Pagination) => {
        changeSearch(prev => ({
            ...prev,
            page: pagination.page.toString(),
            limit: pagination.limit.toString(),
        }));
    }
};

export { useOnPaginationChange };
