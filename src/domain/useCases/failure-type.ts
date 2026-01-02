import {createCrudUseCases} from "@/domain/useCases/factory.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {FailureTypeCreate, FailureTypeUpdate} from "@/domain/models/failure-type.ts";
import type {FailureTypeFilters, FailureTypeSortBy} from "@/domain/queries/failure-type.ts";
import type {FailureTypeRepository} from "@/domain/repositories/failure-type.ts";

const FailureTypeUseCases = createCrudUseCases<
    FailureType,
    FailureTypeCreate,
    FailureTypeUpdate,
    FailureTypeFilters,
    FailureTypeSortBy,
    FailureTypeRepository
>();

export const {
    list: listFailureTypesUseCase,
    create: createFailureTypeUseCase,
    update: updateFailureTypeUseCase,
    delete: deleteFailureTypeUseCase
} = FailureTypeUseCases;