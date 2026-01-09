import type {SparePartFilters, SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {SparePartCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";

type SparePartRepository = CRUDRepository<
    SparePart,
    SparePartCreate,
    SparePartUpdate,
    SparePartFilters,
    SparePartSortBy
>;

export type { SparePartRepository };