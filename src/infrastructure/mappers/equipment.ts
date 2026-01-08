import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentCreateDto, EquipmentDto, EquipmentUpdateDto} from "@/infrastructure/dto/equipment.ts";
import type {EquipmentCreate, EquipmentUpdate} from "@/domain/models/equipment.ts";
import {mapInstitutionDtoToDomain} from "@/infrastructure/mappers/institution.ts";

const mapEquipmentDtoToDomain = (dto: EquipmentDto): Equipment => {
    const { serial_number, equipment_model, equipment_category, institution, ...rest } = dto;
    return {
        ...rest,
        serialNumber: serial_number,
        category: equipment_category,
        model: equipment_model,
        institution: mapInstitutionDtoToDomain(institution),
    }
}

const mapEquipmentCreateDomainToDto = (domain: EquipmentCreate): EquipmentCreateDto => {
    return {
        equipment_model_id: domain.modelId,
        manufacturer_id: domain.manufacturerId,
        equipment_category_id: domain.categoryId,
        installed: domain.installed,
        institution_id: domain.institutionId,
        location: domain.location,
        serial_number: domain.serialNumber,
    };
};

const mapEquipmentUpdateDomainToDto = (domain: EquipmentUpdate): EquipmentUpdateDto => {
    return {
        id: domain.id,
        equipment_model_id: domain.modelId,
        manufacturer_id: domain.manufacturerId,
        equipment_category_id: domain.categoryId,
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