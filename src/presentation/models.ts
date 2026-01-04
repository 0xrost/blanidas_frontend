import type {RequestError} from "@/infrastructure/errors.ts";

interface MutationOptions<T = unknown> {
    onSuccess?: (data: T) => void;
    onError?: (error?: RequestError) => void;
}

export type { MutationOptions };