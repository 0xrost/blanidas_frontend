import {useMutation, useQuery} from "@tanstack/react-query";
import type {ListQuery} from "@/domain/list-query.ts";
import type {PaginationResponse} from "@/domain/pagination.ts";
import type {RequestError} from "@/infrastructure/errors.ts";


type ListQueryFn<TModel, TFilters, TSortBy extends string> = (query: ListQuery<TFilters, TSortBy>) => Promise<PaginationResponse<TModel>>;
type MutationFn<TInput, TResult> = (data: TInput) => Promise<TResult>;

interface CrudHooks<TModel, TCreate, TUpdate, TFilters, TSortBy extends string> {
    useList: (query: ListQuery<TFilters, TSortBy>) => ReturnType<typeof useQuery<PaginationResponse<TModel>>>;
    useCreate: () => ReturnType<typeof useMutation<TModel, RequestError, TCreate, unknown>>;
    useUpdate: () => ReturnType<typeof useMutation<TModel, RequestError, TUpdate, unknown>>;
    useDelete: () => ReturnType<typeof useMutation<string, RequestError, string, unknown>>;
}

function createCrudHooks<TModel, TCreate, TUpdate, TFilters, TSortBy extends string>(
    key: string,
    listFn: ListQueryFn<TModel, TFilters, TSortBy>,
    createFn: MutationFn<TCreate, TModel>,
    updateFn: MutationFn<TUpdate, TModel>,
    deleteFn: MutationFn<string, string>
): CrudHooks<TModel, TCreate, TUpdate, TFilters, TSortBy> {
    return {
        useList: (query: ListQuery<TFilters, TSortBy>) =>
            useQuery<PaginationResponse<TModel>>({
                queryKey: [key, query],
                queryFn: () => listFn(query),
            }),
        useCreate: () =>
            useMutation<TModel, RequestError, TCreate, unknown>({
                mutationFn: (data: TCreate) => createFn(data),
            }),
        useUpdate: () =>
            useMutation<TModel, RequestError, TUpdate, unknown>({
                mutationFn: (data: TUpdate) => updateFn(data),
            }),
        useDelete: () =>
            useMutation<string, RequestError, string, unknown>({
                mutationFn: (id: string) => deleteFn(id),
            }),
    };
}

export { createCrudHooks };
