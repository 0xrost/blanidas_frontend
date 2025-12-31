interface MutationOptions<T = unknown> {
    onSuccess?: (data: T) => void;
    onError?: () => void;
}

export type { MutationOptions };