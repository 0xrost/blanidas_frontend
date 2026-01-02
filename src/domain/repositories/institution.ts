import type {Institution} from "@/domain/entities/institution.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";
import type {InstitutionCreate, InstitutionUpdate} from "@/domain/models/institution.ts";
import type {InstitutionFilters, InstitutionSortBy} from "@/domain/queries/institution-list.query.ts";

interface InstitutionRepository extends CRUDRepository<
    Institution,
    InstitutionCreate,
    InstitutionUpdate,
    InstitutionFilters,
    InstitutionSortBy
> {}

export type { InstitutionRepository };