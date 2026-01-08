import {composeMutationOptions} from "@/presentation/utils.ts";
import type {MutationOptions} from "@/presentation/models.ts";
import type {UseMutationResult} from "@tanstack/react-query";
import type {RequestError} from "@/infrastructure/errors.ts";

function useHandleMutation<TParams, TResponse>(
    mutateFn: UseMutationResult<TResponse, RequestError, TParams, unknown>,
    successFn: (data: TResponse) => void,
    errorFn?: (error?: RequestError) => void
) {
    return (data: TParams, options?: MutationOptions<TResponse>)=> {
        return mutateFn.mutate(data, composeMutationOptions({ onSuccess: successFn, onError: errorFn }, options));
    }
}

export { useHandleMutation };