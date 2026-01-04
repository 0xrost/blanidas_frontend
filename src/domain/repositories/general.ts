import type {ListQuery} from "@/domain/list-query.ts";
import type {PaginationResponse} from "@/domain/pagination.ts";

interface CRUDRepository<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy extends string,
> {
    list(query: ListQuery<TFilters, TSortBy>): Promise<PaginationResponse<TModel>>;
    create(data: TCreate): Promise<TModel>;
    update(data: TUpdate): Promise<TModel>;
    delete(id: string): Promise<string>;
}

export type { CRUDRepository };