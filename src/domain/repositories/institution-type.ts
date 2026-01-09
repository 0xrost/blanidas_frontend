import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";
import type {InstitutionTypeCreate, InstitutionTypeUpdate} from "@/domain/models/institution-type.ts";
import type {InstitutionTypeFilters, InstitutionTypeSortBy} from "@/domain/queries/institution-type-list.query.ts";

type InstitutionTypeRepository = CRUDRepository<
    InstitutionType,
    InstitutionTypeCreate,
    InstitutionTypeUpdate,
    InstitutionTypeFilters,
    InstitutionTypeSortBy
>;

export type { InstitutionTypeRepository };