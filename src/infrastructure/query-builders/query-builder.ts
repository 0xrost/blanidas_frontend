import type {Sorting} from "@/domain/sorting.ts";
import type {Pagination} from "@/domain/pagination.ts";
import type {ListQuery} from "@/domain/list-query.ts";
import type {FilterDefinition} from "@/infrastructure/query/map.ts";


interface BuildOptions<TFilters, TSortBy extends string> {
    filterMap?: Record<keyof TFilters, FilterDefinition>
    sortMap?: Record<TSortBy, string>
}

function buildQueriesWrapper<TFilters, TSortBy extends string>(options?: BuildOptions<TFilters, TSortBy>): (query: ListQuery<TFilters, TSortBy>) => URLSearchParams {
    return (query: ListQuery<TFilters, TSortBy>) => buildQueries(query, options);
}

function buildQueries<TFilters, TSortBy extends string>(query: ListQuery<TFilters, TSortBy>, options?: BuildOptions<TFilters, TSortBy>): URLSearchParams {
    const queries = new URLSearchParams();
    if (query.pagination) {
        const params = mapPaginationQuery(query.pagination);
        params.forEach((value, key) => {queries.set(key, value);});
    }

    if (query.filters && options?.filterMap) {
        const params = mapFiltersQuery(query.filters, options.filterMap);
        params.forEach((value, key) => {queries.set(key, value);});
    }

    if (query.sorting && options?.sortMap) {
        const params = mapSortingQuery(query.sorting, options.sortMap);
        params.forEach((value, key) => {queries.set(key, value);});
    }

    return queries;
}

function mapFiltersQuery<T>(filters: Partial<T>, queryMap: Record<keyof T, FilterDefinition>): URLSearchParams {
    const params = new URLSearchParams();
    const data: Record<string, Record<string, unknown>> = {};

    for (const key in filters) {
        const value = filters[key];
        if (value == null || value === "") continue;

        const definition = queryMap[key];
        if (!definition) continue;

        data[definition.field] = { [definition.operator]: value };
    }

    params.append("filters", JSON.stringify(data));
    return params;
}

function mapSortingQuery<T extends string>(sorting: Sorting<T>, queryMap: Record<T, string>): URLSearchParams {
    const params = {
        sort_by: queryMap[sorting.sortBy],
        sort_order: sorting.sortOrder,
    }

    return new URLSearchParams(params);
}

function mapPaginationQuery(pagination: Pagination): URLSearchParams {
    const params = {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
    }

    return new URLSearchParams(params);
}

export { buildQueries, buildQueriesWrapper };
export type { BuildOptions };
