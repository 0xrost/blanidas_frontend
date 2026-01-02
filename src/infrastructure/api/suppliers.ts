import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {SupplierRepository as SupplierRepositoryInterface} from "@/domain/repositories/suppliers.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SupplierCreate, SupplierUpdate} from "@/domain/models/supplier.ts";
import type {SupplierFilters, SupplierSortBy} from "@/domain/queries/supplier-list.query.ts";
import type {SupplierCreateDto, SupplierDto, SupplierUpdateDto} from "@/infrastructure/dto/supplier.ts";
import {
    mapSupplierCreateDomainToDto,
    mapSupplierDtoToDomain,
    mapSupplierUpdateDomainToDto
} from "@/infrastructure/mappers/supplier.ts";

const supplierMappers: CRUDMappers<
    Supplier,
    SupplierDto,
    SupplierCreate,
    SupplierCreateDto,
    SupplierUpdate,
    SupplierUpdateDto
> = {
    model: mapSupplierDtoToDomain,
    create: mapSupplierCreateDomainToDto,
    update: mapSupplierUpdateDomainToDto,
}

class SupplierRepository extends CRUDRepository<
    Supplier,
    SupplierDto,
    SupplierCreate,
    SupplierCreateDto,
    SupplierUpdate,
    SupplierUpdateDto,
    SupplierFilters,
    SupplierSortBy
> implements SupplierRepositoryInterface {
    constructor() {
        super(Endpoints.supplier, supplierMappers);
    }
}

export { SupplierRepository }