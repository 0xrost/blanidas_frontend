import type {Pagination} from "@/domain/models/pagination.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";
import {buildFiltersQuery} from "@/infrastructure/filters/query-builder.ts";
import {repairRequestFilterMap} from "@/infrastructure/filters/repair-request-filter-map.ts";
import type {SparePartFilters} from "@/domain/filters/spare-part.filters.ts";
import {sparePartFilterMap} from "@/infrastructure/filters/spare-part-filter.map.ts";

const BaseURL = "http://127.0.0.1:8000/api"

const formPaginationQueries = (pagination: Pagination) =>
    `page=${pagination.page}&limit=${pagination.limit}`;

const formOrderingQueries = (orderBy: string) =>
    `order_by=${orderBy}`;

const Endpoints = {
    repairRequest: {
        create: () => BaseURL + "/repair-request/",
        update: () => BaseURL + "/repair-request/",
        list: (pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy) => {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formOrderingQueries(orderBy);
            const filteringQueries = buildFiltersQuery(filters, repairRequestFilterMap);
            return BaseURL + `/repair-request?${paginationQueries}&${orderingQueries}&${filteringQueries}`;
        },
        delete: (id: string) => BaseURL + `/repair-request/${id}`,
        get: (id: string) => BaseURL + `/repair-request/${id}`
    },
    spareParts: {
        list: (pagination: Pagination, filters: SparePartFilters) => {
            const paginationQueries = formPaginationQueries(pagination);
            const filteringQueries = buildFiltersQuery(filters, sparePartFilterMap);
            return BaseURL + `/spare-parts?${paginationQueries}&${filteringQueries}`;
        }
    },
    failureTypes: {
        list: (pagination: Pagination) => BaseURL + "/failure-types?" + formPaginationQueries(pagination),
    },
    equipment: {
        get: (id: string) => BaseURL + "/equipment/" + id,
    },
    institution: {
        list:(page: number, limit: number) => BaseURL + `/institutions?page=${page}&limit=${limit}`,
    },
    auth: {
        login: () => BaseURL + "/users/login",
    },
    summary: {
        getRepairRequest: () => BaseURL + "/summary/repair-request",
    },
    equipmentCategory: {
        list: (page: number, limit: number) => BaseURL + `/equipment-categories?page=${page}&limit=${limit}`,
    }
}

export { Endpoints, BaseURL };