import type {SparePartDTO} from "@/infrastructure/dto/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import {mapSupplierDTOToDomain} from "@/infrastructure/mappers/supplier.ts";

const mapSparePartDTOToDomain = (dto: SparePartDTO): SparePart => {
    return {
        id: dto.id,
        name: dto.name,
        note: dto.note,
        quantity: dto.quantity,
        locations: dto.locations,
        minQuality: dto.min_quality,
        manufacturer: dto.manufacturer,
        serialNumber: dto.serial_number,
        compatibleModels: dto.compatible_models,
        sparePartCategory: dto.spare_part_category,
        supplier: dto.supplier ? mapSupplierDTOToDomain(dto.supplier) : null,
    };
}

export { mapSparePartDTOToDomain };