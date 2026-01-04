import type {MutationOptions} from "@/presentation/models.ts";

function composeMutationOptions<T>(...options: (MutationOptions<T> | undefined)[]): MutationOptions<T> {
    return {
        onSuccess: (data: T) => {
            options.forEach(option => {
                if (option?.onSuccess) option.onSuccess(data);
            });
        },
        onError: (error) => {
            options.forEach(option => {
                if (option?.onError) option.onError(error);
            });
        }
    };
}

export { composeMutationOptions };