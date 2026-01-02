import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SupplierFilters, SupplierSortBy} from "@/domain/queries/supplier-list.query.ts";
import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {SupplierCreate, SupplierUpdate} from "@/domain/models/supplier.ts";
import type {SupplierRepository} from "@/domain/repositories/suppliers.ts";

const SupplierUseCases = createCrudUseCases<Supplier, SupplierCreate, SupplierUpdate, SupplierFilters, SupplierSortBy, SupplierRepository>();

export const {
    list: listSuppliersUseCase,
    create: createSupplierUseCase,
    update: updateSupplierUseCase,
    delete: deleteSupplierUseCase
} = SupplierUseCases;