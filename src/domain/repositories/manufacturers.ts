import type {ManufacturerFilters, ManufacturerSortBy} from "@/domain/queries/manufacturer-list.query.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {ManufacturerCreate, ManufacturerUpdate} from "@/domain/models/manufacturer.ts";

interface ManufacturerRepository extends CRUDRepository<
    Manufacturer,
    ManufacturerCreate,
    ManufacturerUpdate,
    ManufacturerFilters,
    ManufacturerSortBy
> {}

export type { ManufacturerRepository };