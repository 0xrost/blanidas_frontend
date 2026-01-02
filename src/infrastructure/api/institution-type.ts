import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {ManufacturerRepository as ManufacturerRepositoryInterface} from "@/domain/repositories/manufacturers.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {InstitutionType} from "@/domain/entities/institution-type.ts";
import type {InstitutionTypeCreate, InstitutionTypeUpdate} from "@/domain/models/institution-type.ts";
import type {InstitutionTypeFilters, InstitutionTypeSortBy} from "@/domain/queries/institution-type-list.query.ts";

const institutionTypeMappers: CRUDMappers<
    InstitutionType,
    InstitutionType,
    InstitutionTypeCreate,
    InstitutionTypeCreate,
    InstitutionTypeUpdate,
    InstitutionTypeUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class InstitutionTypeRepository extends CRUDRepository<
    InstitutionType,
    InstitutionType,
    InstitutionTypeCreate,
    InstitutionTypeCreate,
    InstitutionTypeUpdate,
    InstitutionTypeUpdate,
    InstitutionTypeFilters,
    InstitutionTypeSortBy
> implements ManufacturerRepositoryInterface {
    constructor() {
        super(Endpoints.institutionType, institutionTypeMappers);
    }
}

export { InstitutionTypeRepository };