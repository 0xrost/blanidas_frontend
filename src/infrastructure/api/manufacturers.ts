import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import {emptyDomainToDtoMapper, emptyDtoToDomainMapper} from "@/infrastructure/mappers/mapper.ts";
import type {ManufacturerRepository as ManufacturerRepositoryInterface} from "@/domain/repositories/manufacturers.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {ManufacturerCreate, ManufacturerUpdate} from "@/domain/models/manufacturer.ts";
import type {ManufacturerFilters, ManufacturerSortBy} from "@/domain/queries/manufacturer-list.query.ts";

const manufacturerMappers: CRUDMappers<
    Manufacturer,
    Manufacturer,
    ManufacturerCreate,
    ManufacturerCreate,
    ManufacturerUpdate,
    ManufacturerUpdate
> = {
    model: emptyDtoToDomainMapper,
    create: emptyDomainToDtoMapper,
    update: emptyDomainToDtoMapper,
}

class ManufacturerRepository extends CRUDRepository<
    Manufacturer,
    Manufacturer,
    ManufacturerCreate,
    ManufacturerCreate,
    ManufacturerUpdate,
    ManufacturerUpdate,
    ManufacturerFilters,
    ManufacturerSortBy
> implements ManufacturerRepositoryInterface {
    constructor() {
        super(Endpoints.manufacturer, manufacturerMappers);
    }
}

export { ManufacturerRepository };