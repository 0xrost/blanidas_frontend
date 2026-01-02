import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {SparePartRepository as SparePartRepositoryInterface} from "@/domain/repositories/spare-part.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {SparePartCreateDto, SparePartDto, SparePartUpdateDto} from "@/infrastructure/dto/spare-part.ts";
import type {SparePartCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";
import {
    mapSparePartCreateDomainToDto,
    mapSparePartDtoToDomain,
    mapSparePartUpdateDomainToDto
} from "@/infrastructure/mappers/spare-part.ts";
import type {SparePartFilters, SparePartSortBy} from "@/domain/queries/spare-part-list.query.ts";

const sparePartMappers: CRUDMappers<
    SparePart,
    SparePartDto,
    SparePartCreate,
    SparePartCreateDto,
    SparePartUpdate,
    SparePartUpdateDto
> = {
    model: mapSparePartDtoToDomain,
    create: mapSparePartCreateDomainToDto,
    update: mapSparePartUpdateDomainToDto,
}

class SparePartRepository extends CRUDRepository<
    SparePart,
    SparePartDto,
    SparePartCreate,
    SparePartCreateDto,
    SparePartUpdate,
    SparePartUpdateDto,
    SparePartFilters,
    SparePartSortBy
> implements SparePartRepositoryInterface {
    constructor() {
        super(Endpoints.sparePart, sparePartMappers);
    }
}

export { SparePartRepository };