import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentCreateDto, EquipmentDto, EquipmentUpdateDto} from "@/infrastructure/dto/equipment.ts";
import type {EquipmentCreate, EquipmentUpdate} from "@/domain/models/equipment.ts";

const mapEquipmentDtoToDomain = (dto: EquipmentDto): Equipment => {
    const { serial_number, equipment_model, equipment_category, ...rest } = dto;
    return {
        ...rest,
        serialNumber: serial_number,
        category: equipment_category,
        model: equipment_model,
    }
}

const mapEquipmentCreateDomainToDto = (domain: EquipmentCreate): EquipmentCreateDto => {
    return {
        model_id: domain.modelId,
        manufacturer_id: domain.manufacturerId,
        category_id: domain.categoryId,
        installed: domain.installed,
        institution_id: domain.institutionId,
        location: domain.location,
        serial_number: domain.serialNumber,
    };
};

const mapEquipmentUpdateDomainToDto = (domain: EquipmentUpdate): EquipmentUpdateDto => {
    return {
        model_id: domain.modelId,
        manufacturer_id: domain.manufacturerId,
        category_id: domain.categoryId,
        installed: domain.installed,
        institution_id: domain.institutionId,
        location: domain.location,
        serial_number: domain.serialNumber,
    };
};

export {
    mapEquipmentDtoToDomain,
    mapEquipmentUpdateDomainToDto,
    mapEquipmentCreateDomainToDto,
};