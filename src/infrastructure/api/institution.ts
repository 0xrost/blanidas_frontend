import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {InstitutionCreate, InstitutionUpdate} from "@/domain/models/institution.ts";
import type {InstitutionFilters, InstitutionSortBy} from "@/domain/queries/institution-list.query.ts";
import type {InstitutionRepository as InstitutionRepositoryInterface} from "@/domain/repositories/institution.ts";
import {
    mapInstitutionCreateDomainToDto,
    mapInstitutionDtoToDomain,
    mapInstitutionUpdateDomainToDto
} from "@/infrastructure/mappers/institution.ts";
import type {InstitutionCreateDto, InstitutionDto, InstitutionUpdateDto} from "@/infrastructure/dto/institution.ts";

const institutionMappers: CRUDMappers<
    Institution,
    InstitutionDto,
    InstitutionCreate,
    InstitutionCreateDto,
    InstitutionUpdate,
    InstitutionUpdateDto
> = {
    model: mapInstitutionDtoToDomain,
    create: mapInstitutionCreateDomainToDto,
    update: mapInstitutionUpdateDomainToDto,
}

class InstitutionRepository extends CRUDRepository<
    Institution,
    InstitutionDto,
    InstitutionCreate,
    InstitutionCreateDto,
    InstitutionUpdate,
    InstitutionUpdateDto,
    InstitutionFilters,
    InstitutionSortBy
> implements InstitutionRepositoryInterface {
    constructor() {
        super(Endpoints.institution, institutionMappers);
    }
}

export { InstitutionRepository };