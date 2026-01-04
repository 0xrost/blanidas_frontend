import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {SupplierRepository as SupplierRepositoryInterface} from "@/domain/repositories/suppliers.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SupplierCreate, SupplierUpdate} from "@/domain/models/supplier.ts";
import type {SupplierFilters, SupplierSortBy} from "@/domain/queries/supplier-list.query.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";

const supplierMappers: CRUDMappers<
    Supplier,
    Supplier,
    SupplierCreate,
    SupplierCreate,
    SupplierUpdate,
    SupplierUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class SupplierRepository extends CRUDRepository<
    Supplier,
    Supplier,
    SupplierCreate,
    SupplierCreate,
    SupplierUpdate,
    SupplierUpdate,
    SupplierFilters,
    SupplierSortBy
> implements SupplierRepositoryInterface {
    constructor() {
        super(Endpoints.supplier, supplierMappers);
    }
}

export { SupplierRepository }