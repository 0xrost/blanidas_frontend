import type {RequestError} from "@/infrastructure/errors.ts";

interface MutationOptions<T = unknown> {
    onSuccess?: (data: T) => void;
    onError?: (error?: RequestError) => void;
}

interface PaginationSearch {
    page: string;
    limit: string;
}

export type { MutationOptions, PaginationSearch };