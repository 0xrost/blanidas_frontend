import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";
import type {InstitutionTypeCreate, InstitutionTypeUpdate} from "@/domain/models/institution-type.ts";
import type {InstitutionTypeFilters, InstitutionTypeSortBy} from "@/domain/queries/institution-type-list.query.ts";
import type {InstitutionTypeRepository} from "@/domain/repositories/institution-type.ts";

const InstitutionTypeUseCases = createCrudUseCases<
    InstitutionType,
    InstitutionTypeCreate,
    InstitutionTypeUpdate,
    InstitutionTypeFilters,
    InstitutionTypeSortBy,
    InstitutionTypeRepository
>();

export const {
    list: listInstitutionTypeUseCase,
    create: createInstitutionTypeUseCase,
    update: updateInstitutionTypeUseCase,
    delete: deleteInstitutionTypeUseCase
} = InstitutionTypeUseCases;