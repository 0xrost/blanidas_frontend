import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {FailureTypeCreate, FailureTypeUpdate} from "@/domain/models/failure-type.ts";
import type {FailureTypeFilters, FailureTypeSortBy} from "@/domain/queries/failure-type.ts";
import type {FailureTypeRepository as FailureTypeRepositoryInterface} from "@/domain/repositories/failure-type.ts";


const failureTypeMappers: CRUDMappers<
    FailureType,
    FailureType,
    FailureTypeCreate,
    FailureTypeCreate,
    FailureTypeUpdate,
    FailureTypeUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class FailureTypeRepository extends CRUDRepository<
    FailureType,
    FailureType,
    FailureTypeCreate,
    FailureTypeCreate,
    FailureTypeUpdate,
    FailureTypeUpdate,
    FailureTypeFilters,
    FailureTypeSortBy
> implements FailureTypeRepositoryInterface {
    constructor() {
        super(Endpoints.failureType, failureTypeMappers);
    }
}

export { FailureTypeRepository };