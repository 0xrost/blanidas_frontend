import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {FailureTypeFilters, FailureTypeSortBy} from "@/domain/queries/failure-type.ts";
import type {FailureTypeCreate, FailureTypeUpdate} from "@/domain/models/failure-type.ts";

type FailureTypeRepository = CRUDRepository<
    FailureType,
    FailureTypeCreate,
    FailureTypeUpdate,
    FailureTypeFilters,
    FailureTypeSortBy
>;

export type { FailureTypeRepository };
