import type {SparePartDTO} from "@/infrastructure/dto/spare-part.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";

const mapSparePartDTOToDomain = (dto: SparePartDTO): SparePart => {
    return {
        id: dto.id,
        name: dto.name,
        note: dto.note,
        minQuality: dto.min_quality,
        serialNumber: dto.serial_number,
        manufacturer: dto.manufacturer,
        compatibleModels: dto.compatible_models,
        sparePartCategory: dto.spare_part_category,

    }
}