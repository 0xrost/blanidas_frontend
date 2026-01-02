import type {Supplier} from "@/domain/entities/supplier.ts";
import type {SupplierFilters, SupplierSortBy} from "@/domain/queries/supplier-list.query.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {SupplierCreate, SupplierUpdate} from "@/domain/models/supplier.ts";

interface SupplierRepository extends CRUDRepository<
    Supplier,
    SupplierCreate,
    SupplierUpdate,
    SupplierFilters,
    SupplierSortBy
> {}

export type { SupplierRepository };