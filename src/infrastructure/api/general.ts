import type {CRUDRepository as CRUDRepositoryInterface} from "@/domain/repositories/general.ts";
import type {ListQuery} from "@/domain/list-query.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import type {DomainToDtoMapper, DtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {PaginationResponse} from "@/domain/pagination.ts";
import type {PaginationResponseDto} from "@/infrastructure/dto/pagination.ts";
import {RequestError} from "@/infrastructure/errors.ts";
import {jsonRequestHeaders} from "@/infrastructure/api/headers.ts";
import {fetchWithAuth} from "@/infrastructure/fetch.ts";


interface CRUDEndpoints<TFilters, TSortBy extends string> {
    list: (query: ListQuery<TFilters, TSortBy>) => string
    create: () => string,
    update: () => string,
    delete: (id: string) => string,
}

interface CRUDMappers<TModel, TModelDto, TCreate, TCreateDto, TUpdate, TUpdateDto> {
    model: DtoToDomainMapper<TModelDto, TModel>;
    create: DomainToDtoMapper<TCreate, TCreateDto>;
    update: DomainToDtoMapper<TUpdate, TUpdateDto>;
}

abstract class CRUDRepository<
    TModel,
    TModelDto,
    TCreate,
    TCreateDto,
    TUpdate,
    TUpdateDto,
    TFilters,
    TSortBy extends string,
>  implements CRUDRepositoryInterface<
    TModel,
    TCreate,
    TUpdate,
    TFilters,
    TSortBy
> {
    protected readonly endpoints: CRUDEndpoints<TFilters, TSortBy>;
    protected readonly mappers: CRUDMappers<TModel, TModelDto, TCreate, TCreateDto, TUpdate, TUpdateDto>;

    protected constructor(
        endpoints: CRUDEndpoints<TFilters, TSortBy>,
        mappers: CRUDMappers<TModel, TModelDto, TCreate, TCreateDto, TUpdate, TUpdateDto>
    ) {
        this.endpoints = endpoints;
        this.mappers = mappers;
    }

    protected async request<TResponse>(url: string, init?: RequestInit): Promise<TResponse> {
        const response = await fetchWithAuth(url, init);
        console.log("--------------------------------------------------")
        if (!response.ok) throw new RequestError(response.status);
        if (response.status === 204) return undefined as TResponse;
        return response.json();
    }

    async list(query: ListQuery<TFilters, TSortBy>): Promise<PaginationResponse<TModel>> {
        const json = await this.request<PaginationResponseDto<TModelDto>>(this.endpoints.list(query));
        return mapPaginationResponseDtoToDomain(json, this.mappers.model);
    }

    async create(data: TCreate): Promise<TModel> {
        const mapped = this.mappers.create(data);
        const mappedJson = JSON.stringify(mapped);
        const json = await this.request<TModelDto>(this.endpoints.create(), {
            ...jsonRequestHeaders,
            method: "POST",
            body: mappedJson,
        });

        return this.mappers.model(json);
    }

    async update(data: TUpdate): Promise<TModel> {
        const mapped = this.mappers.update(data);
        const mappedJson = JSON.stringify(mapped);
        const json = await this.request<TModelDto>(this.endpoints.update(), {
            ...jsonRequestHeaders,
            method: "PUT",
            body: mappedJson,
        })

        return this.mappers.model(json)
    }

    async delete(id: string): Promise<string> {
        return await this.request(this.endpoints.delete(id), { method: "DELETE" });
    }
}

export type { CRUDMappers };
export { CRUDRepository };