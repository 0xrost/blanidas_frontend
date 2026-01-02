import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {InstitutionCreate, InstitutionUpdate} from "@/domain/models/institution.ts";
import type {InstitutionFilters, InstitutionSortBy} from "@/domain/queries/institution-list.query.ts";
import type {InstitutionRepository} from "@/domain/repositories/institution.ts";

const InstitutionUseCases = createCrudUseCases<
    Institution,
    InstitutionCreate,
    InstitutionUpdate,
    InstitutionFilters,
    InstitutionSortBy,
    InstitutionRepository
>();

export const {
    list: listInstitutionsUseCase,
    create: createInstitutionUseCase,
    update: updateInstitutionUseCase,
    delete: deleteInstitutionUseCase
} = InstitutionUseCases;