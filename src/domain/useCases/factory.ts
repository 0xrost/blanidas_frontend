import {InvalidLimitError, InvalidPageNumberError} from "@/domain/errors.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {ListQuery} from "@/domain/list-query.ts";
import type {PaginationResponse} from "@/domain/pagination.ts";

function createListUseCase<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
    TRepository extends CRUDRepository<TModel, TCreate, TUpdate, TFilters, TSortBy>
>() {
    return (repo: TRepository) => {
        return async (query: ListQuery<TFilters, TSortBy>): Promise<PaginationResponse<TModel>> => {
            if (query.pagination.page < 1) throw new InvalidPageNumberError(query.pagination.page);
            if (query.pagination.limit < 1 && query.pagination.limit !== -1) throw new InvalidLimitError(query.pagination.limit);
            return await repo.list(query);
        };
    }
}

function createCreateUseCase<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
    TRepository extends CRUDRepository<TModel, TCreate, TUpdate, TFilters, TSortBy>
>() {
    return (repo: TRepository) => {
        return async (data: TCreate): Promise<TModel> => {
            return await repo.create(data);
        }
    }
}

function createUpdateUseCase<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
    TRepository extends CRUDRepository<TModel, TCreate, TUpdate, TFilters, TSortBy>
>() {
    return (repo: TRepository) => {
        return async (data: TUpdate): Promise<TModel> => {
            return await repo.update(data);
        }
    }
}

function createDeleteUseCase<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
    TRepository extends CRUDRepository<TModel, TCreate, TUpdate, TFilters, TSortBy>
>() {
    return (repo: TRepository) => {
        return async (id: string): Promise<string> => {
            return await repo.delete(id);
        }
    }
}

function createCrudUseCases<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
    TRepository extends CRUDRepository<TModel, TCreate, TUpdate, TFilters, TSortBy>
>() {
    return {
        list: createListUseCase<TModel, TCreate, TUpdate, TFilters, TSortBy, TRepository>(),
        create: createCreateUseCase<TModel, TCreate, TUpdate, TFilters, TSortBy, TRepository>(),
        update: createUpdateUseCase<TModel, TCreate, TUpdate, TFilters, TSortBy, TRepository>(),
        delete: createDeleteUseCase<TModel, TCreate, TUpdate, TFilters, TSortBy, TRepository>(),
    };
}

export {
    createCreateUseCase,
    createUpdateUseCase,
    createDeleteUseCase,
    createListUseCase,
    createCrudUseCases,
}