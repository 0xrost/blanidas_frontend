import type {LocationCreateDto, SparePartDto, SparePartUpdateDto} from "@/infrastructure/dto/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {mapSupplierDtoToDomain} from "@/infrastructure/mappers/supplier.ts";
import type {LocationCreate, SparePartUpdate} from "@/domain/models/spare-parts.ts";

const mapSparePartDtoToDomain = (dto: SparePartDto): SparePart => {
    return {
        id: dto.id,
        name: dto.name,
        note: dto.note,
        locations: dto.locations,
        minQuantity: dto.min_quantity,
        manufacturer: dto.manufacturer,
        compatibleModels: dto.compatible_models,
        sparePartCategory: dto.spare_part_category,
        supplier: mapSupplierDtoToDomain(dto.supplier),
    };
}

const mapLocationCreateDomainToDto = (domain: LocationCreate): LocationCreateDto => {
    return {
        institution_id: domain.institutionId,
        quantity: domain.quantity,
    };
};

const mapSparePartUpdateDomainToDto = (domain: SparePartUpdate): SparePartUpdateDto => {
    const locations = domain.locations ? domain.locations.map(mapLocationCreateDomainToDto) : undefined;
    return {
        id: domain.id,
        name: domain.name,
        note: domain.note,
        locations: locations,
        min_quantity: domain.minQuantity,
        sparePartCategory_id: domain.sparePartCategoryId,
        manufacturer_Id: domain.manufacturerId,
        compatible_models_ids: domain.compatibleModelsIds,
        supplier_id: domain.supplierId,
    };
};

export {
    mapSparePartUpdateDomainToDto,
    mapSparePartDtoToDomain,
};