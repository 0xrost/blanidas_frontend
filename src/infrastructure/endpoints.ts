import type {Pagination} from "@/domain/models/pagination.ts";
import type {
    RepairRequestFilters,
    RepairRequestSorting
} from "@/domain/query/repair-request.query.ts";
import {buildFiltersQuery} from "@/infrastructure/query/query-builder.ts";
import {repairRequestsFiltersMap, repairRequestsSortingMap} from "@/infrastructure/query/repair-request-query.map.ts";
import type {SparePartsFilters, SparePartsSorting} from "@/domain/query/spare-part.query.ts";
import {sparePartsFiltersMap, sparePartsSortingMap} from "@/infrastructure/query/spare-part-query.map.ts";
import type {SortOrder} from "@/domain/query/query.ts";
import type {SparePartCategoriesSorting} from "@/domain/query/spare-part-categories.query.ts";
import type {EquipmentModelsSorting} from "@/domain/query/equipment-models.query.ts";
import type {SuppliersSorting} from "@/domain/query/suppliers.query.ts";
import type {ManufacturersFilters, ManufacturersSorting} from "@/domain/query/manufacturer.query.ts";

const BaseURL = "http://127.0.0.1:8000/api"

const formPaginationQueries = (pagination: Pagination) =>
    `page=${pagination.page}&limit=${pagination.limit}`;

const formSortingQueries = (sortBy: string, sortOrder: SortOrder, map: Record<string, string>) => {
    return map[sortBy] ? `sort_by=${map[sortBy]}&sort_order=${sortOrder}` : "";
}

const Endpoints = {
    repairRequest: {
        create: () => BaseURL + "/repair-requests/",
        update: () => BaseURL + "/repair-requests/",
        list: (pagination: Pagination, filters: RepairRequestFilters, sorting: RepairRequestSorting) => {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, repairRequestsSortingMap);
            const filteringQueries = buildFiltersQuery(filters, repairRequestsFiltersMap);
            return BaseURL + `/repair-requests/?${paginationQueries}&${orderingQueries}&${filteringQueries}`;
        },
        delete: (id: string) => BaseURL + `/repair-requests/${id}`,
        get: (id: string) => BaseURL + `/repair-requests/${id}`
    },
    spareParts: {
        list: (pagination: Pagination, filters: SparePartsFilters, sorting: SparePartsSorting) => {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, sparePartsSortingMap);
            const filteringQueries = buildFiltersQuery(filters, sparePartsFiltersMap);
            return BaseURL + `/spare-parts/?${paginationQueries}&${filteringQueries}&${orderingQueries}`;
        },
        update: () => BaseURL + "/spare-parts/",
        create: () => BaseURL + "/spare-parts/",
        delete: (id: string) => BaseURL + "/spare-parts/" + id,
    },
    sparePartCategories: {
        list(pagination: Pagination, sorting: SparePartCategoriesSorting) {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, sparePartsSortingMap);
            return BaseURL + `/spare-part-categories/?${paginationQueries}&${orderingQueries}`;
        }
    },
    suppliers: {
        list(pagination: Pagination, sorting: SuppliersSorting) {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, sparePartsSortingMap);
            return BaseURL + `/suppliers/?${paginationQueries}&${orderingQueries}`;
        }
    },
    manufacturers: {
        list(pagination: Pagination, filters:ManufacturersFilters, sorting: ManufacturersSorting) {
            const filteringQueries = buildFiltersQuery(filters, sparePartsFiltersMap);

            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, sparePartsSortingMap);
            return BaseURL + `/manufacturers/?${paginationQueries}&${orderingQueries}&${filteringQueries}`;
        }
    },
    failureTypes: {
        list: (pagination: Pagination) => BaseURL + "/failure-types/?" + formPaginationQueries(pagination),
    },
    equipment: {
        get: (id: string) => BaseURL + "/equipment/" + id,
    },
    equipmentModels: {
        list: (pagination: Pagination, sorting: EquipmentModelsSorting) => {
            const paginationQueries = formPaginationQueries(pagination);
            const orderingQueries = formSortingQueries(sorting.sortBy, sorting.sortOrder, sparePartsSortingMap);
            return BaseURL + `/equipment-models/?${paginationQueries}&${orderingQueries}`;
        },
    },
    institution: {
        list:(pagination: Pagination) => BaseURL + `/institutions/?${formPaginationQueries(pagination)}`,
    },
    auth: {
        login: () => BaseURL + "/users/login/",
    },
    summary: {
        getRepairRequests: () => BaseURL + "/summary/repair-requests",
        getSpareParts: () => BaseURL + "/summary/spare-parts",
    },
    equipmentCategory: {
        list: (pagination: Pagination) => BaseURL + `/equipment-categories/?${formPaginationQueries(pagination)}`,
    }
}

export { Endpoints, BaseURL };