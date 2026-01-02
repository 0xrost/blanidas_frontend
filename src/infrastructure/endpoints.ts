import type {RepairRequestListQuery} from "@/domain/queries/repair-request-list.query.ts";
import {type BuildOptions, buildQueries} from "@/infrastructure/query/query-builder.ts";
import {repairRequestsFilterMap, repairRequestsSortMap} from "@/infrastructure/query/repair-request-query.map.ts";
import type {SparePartListQuery} from "@/domain/queries/spare-part-list.query.ts";
import {sparePartsFilterMap, sparePartsSortMap} from "@/infrastructure/query/spare-part-query.map.ts";
import type {SparePartCategoryListQuery} from "@/domain/queries/spare-part-category-list.query.ts";
import type {SupplierListQuery} from "@/domain/queries/supplier-list.query.ts";
import type {ManufacturerListQuery} from "@/domain/queries/manufacturer-list.query.ts";
import type {ListQuery} from "@/domain/list-query.ts";
import {
    sparePartCategoryFilterMap,
    sparePartCategorySortMap
} from "@/infrastructure/query/spare-part-category-query.map.ts";
import {supplierFilterMap, supplierSortMap} from "@/infrastructure/query/supplier-query.map.ts";
import {manufacturerFilterMap, manufacturerSortMap} from "@/infrastructure/query/manufacturer-query.map.ts";
import {failureTypeFilterMap, failureTypeSortMap} from "@/infrastructure/query/failure-type-query.map.ts";
import {equipmentFilterMap, equipmentSortMap} from "@/infrastructure/query/equipment-query.map.ts";
import {equipmentModelFilterMap, equipmentModelSortMap} from "@/infrastructure/query/equipment-model-query.map.ts";
import {institutionFilterMap, institutionSortMap} from "@/infrastructure/query/institution-query.map.ts";
import {
    equipmentCategoryFilterMap,
    equipmentCategorySortMap
} from "@/infrastructure/query/equipment-category-query.map.ts";
import type {FailureTypeListQuery} from "@/domain/queries/failure-type.ts";
import type {EquipmentListQuery} from "@/domain/queries/equipment-list.query.ts";
import type {EquipmentModelListQuery} from "@/domain/queries/equipment-model-list.query.ts";
import type {InstitutionListQuery} from "@/domain/queries/institution-list.query.ts";
import type {EquipmentCategoryListQuery} from "@/domain/queries/equipment-category-list.query.ts";
import type {UserListQuery} from "@/domain/queries/user-list.query.ts";
import {userFilterMap, userSortMap} from "@/infrastructure/query/user-list-query.map.ts";
import {institutionTypeFilterMap, institutionTypeSortMap} from "@/infrastructure/query/institution-type-query.map.ts";
import type {InstitutionTypeListQuery} from "@/domain/queries/institution-type-list.query.ts";

const BaseURL = "http://127.0.0.1:8000"


function buildURL<TFilter, TSortBy extends string>(
    baseURL: string,
    query: ListQuery<TFilter, TSortBy>,
    options: BuildOptions<TFilter, TSortBy>
): string {
    const queries = buildQueries(query, options).toString()
    return queries ? `${baseURL}?${queries}` : baseURL;
}

const Endpoints = {
    repairRequest: {
        mappers: {
            filterMap: repairRequestsFilterMap,
            sortMap: repairRequestsSortMap,
        },
        base: BaseURL + "/api/repair-requests/",

        list: (query: RepairRequestListQuery) => buildURL(Endpoints.repairRequest.base, query, Endpoints.repairRequest.mappers),
        get: (id: string) => `${Endpoints.repairRequest.base}${id}`,
        create: () => Endpoints.repairRequest.base,
        update: () => Endpoints.repairRequest.base,
        delete: (id: string) => `${Endpoints.repairRequest.base}${id}`,
    },
    sparePart: {
        mappers: {
            filterMap: sparePartsFilterMap,
            sortMap: sparePartsSortMap,
        },
        base: BaseURL + "/api/spare-parts/",

        list: (query: SparePartListQuery) => buildURL(Endpoints.sparePart.base, query, Endpoints.sparePart.mappers),
        update: () => Endpoints.sparePart.base,
        create: () => Endpoints.sparePart.base,
        delete: (id: string) => `${Endpoints.sparePart.base}${id}`,
    },
    sparePartCategory: {
        mappers: {
            filterMap: sparePartCategoryFilterMap,
            sortMap: sparePartCategorySortMap,
        },
        base: BaseURL + "/api/spare-part-categories/",

        list: (query: SparePartCategoryListQuery) => buildURL(Endpoints.sparePartCategory.base, query, Endpoints.sparePartCategory.mappers),
        update: () => Endpoints.sparePartCategory.base,
        create: () => Endpoints.sparePartCategory.base,
        delete: (id: string) => `${Endpoints.sparePartCategory.base}${id}`,
    },
    supplier: {
        mappers: {
            filterMap: supplierFilterMap,
            sortMap: supplierSortMap,
        },
        base: BaseURL + "/api/suppliers/",

        list: (query: SupplierListQuery) => buildURL(Endpoints.supplier.base, query, Endpoints.supplier.mappers),
        update: () => Endpoints.supplier.base,
        create: () => Endpoints.supplier.base,
        delete: (id: string) => `${Endpoints.supplier.base}${id}`,
    },
    manufacturer: {
        mappers: {
            filterMap: manufacturerFilterMap,
            sortMap: manufacturerSortMap,
        },
        base: BaseURL + "/api/manufacturers/",

        list: (query: ManufacturerListQuery) => buildURL(Endpoints.manufacturer.base, query, Endpoints.manufacturer.mappers),
        update: () => Endpoints.manufacturer.base,
        create: () => Endpoints.manufacturer.base,
        delete: (id: string) => `${Endpoints.manufacturer.base}${id}`,
    },
    failureType: {
        mappers: {
            filterMap: failureTypeFilterMap,
            sortMap: failureTypeSortMap,
        },
        base: BaseURL + "/api/failure-types/",

        list: (query: FailureTypeListQuery) => buildURL(Endpoints.failureType.base, query, Endpoints.failureType.mappers),
        update: () => Endpoints.failureType.base,
        create: () => Endpoints.failureType.base,
        delete: (id: string) => `${Endpoints.failureType.base}${id}`,
    },
    equipment: {
        mappers: {
            filterMap: equipmentFilterMap,
            sortMap: equipmentSortMap,
        },
        base: BaseURL + "/api/equipment/",

        list: (query: EquipmentListQuery) => buildURL(Endpoints.equipment.base, query, Endpoints.equipment.mappers),
        get: (id: string) => `${Endpoints.equipment.base}${id}`,
        create: () => Endpoints.equipment.base,
        update: () => Endpoints.equipment.base,
        delete: (id: string) => `${Endpoints.equipment.base}${id}`,
    },
    equipmentModel: {
        mappers: {
            filterMap: equipmentModelFilterMap,
            sortMap: equipmentModelSortMap,
        },
        base: BaseURL + "/api/equipment-models/",

        list: (query: EquipmentModelListQuery) => buildURL(Endpoints.equipmentModel.base, query, Endpoints.equipmentModel.mappers),
        update: () => Endpoints.equipmentModel.base,
        create: () => Endpoints.equipmentModel.base,
        delete: (id: string) => `${Endpoints.equipmentModel.base}${id}`,
    },
    institution: {
        mappers: {
            filterMap: institutionFilterMap,
            sortMap: institutionSortMap,
        },
        base: BaseURL + "/api/institutions/",

        list: (query: InstitutionListQuery) => buildURL(Endpoints.institution.base, query, Endpoints.institution.mappers),
        update: () => Endpoints.institution.base,
        create: () => Endpoints.institution.base,
        delete: (id: string) => `${Endpoints.institution.base}${id}`,
    },
    institutionType: {
        mappers: {
            filterMap: institutionTypeFilterMap,
            sortMap: institutionTypeSortMap,
        },
        base: BaseURL + "/api/institution-types/",

        list: (query: InstitutionTypeListQuery) => buildURL(Endpoints.institutionType.base, query, Endpoints.institutionType.mappers),
        update: () => Endpoints.institutionType.base,
        create: () => Endpoints.institutionType.base,
        delete: (id: string) => `${Endpoints.institutionType.base}${id}`,
    },
    auth: {
        base: BaseURL + "/api/users/",
        login: () => `${Endpoints.auth.base}login`,
    },
    summary: {
        base: BaseURL + "/api/summary/",

        getRepairRequests: () => `${Endpoints.summary.base}repair-requests`,
        getInstitutions: () => `${Endpoints.summary.base}institutions`,
        getSpareParts: () => `${Endpoints.summary.base}spare-parts`,
        getUsers: () => `${Endpoints.summary.base}users`
    },
    equipmentCategory: {
        mappers: {
            filterMap: equipmentCategoryFilterMap,
            sortMap: equipmentCategorySortMap,
        },
        base: BaseURL + "/api/equipment-categories/",

        list: (query: EquipmentCategoryListQuery) => buildURL(Endpoints.equipmentCategory.base, query, Endpoints.equipmentCategory.mappers),
        update: () => Endpoints.equipmentCategory.base,
        create: () => Endpoints.equipmentCategory.base,
        delete: (id: string) => `${Endpoints.equipmentCategory.base}${id}`,
    },
    user: {
        mappers: {
            filterMap: userFilterMap,
            sortMap: userSortMap,
        },
        base: BaseURL + "/api/users/",

        list: (query: UserListQuery) => buildURL(Endpoints.user.base, query, Endpoints.user.mappers),
        update: () => Endpoints.user.base,
        create: () => Endpoints.user.base,
        delete: (id: string) => `${Endpoints.user.base}${id}`,
    }
}

export { Endpoints, BaseURL };