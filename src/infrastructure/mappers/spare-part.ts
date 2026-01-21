import type {
    LocationCreateDto,
    SparePartCreateDto,
    SparePartDto,
    SparePartUpdateDto
} from "@/infrastructure/dto/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {LocationCreate, SparePartCreate, SparePartUpdate} from "@/domain/models/spare-part.ts";

const mapSparePartDtoToDomain = (dto: SparePartDto): SparePart => {
    return {
        id: dto.id,
        name: dto.name,
        note: dto.note,
        locations: dto.locations,
        minQuantity: dto.min_quantity,
        totalQuantity: dto.total_quantity,
        stockStatus: dto.stock_status,
        compatibleModels: dto.compatible_models,
        category: dto.spare_part_category,
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
        locations: locations,
        min_quantity: domain.minQuantity,
        spare_part_category_id: domain.sparePartCategoryId,
        compatible_models_ids: domain.compatibleModelIds,
    };
};


const mapSparePartCreateDomainToDto = (domain: SparePartCreate): SparePartCreateDto => {
    return {
        name: domain.name,
        min_quantity: domain.minQuantity,
        spare_part_category_id: domain.sparePartCategoryId,
        compatible_models_ids: domain.compatibleModelIds,
    };
};

export {
    mapSparePartUpdateDomainToDto,
    mapSparePartDtoToDomain,
    mapSparePartCreateDomainToDto,
};