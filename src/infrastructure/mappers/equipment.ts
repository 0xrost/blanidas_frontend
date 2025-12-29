import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentDto} from "@/infrastructure/dto/equipment.ts";

const mapEquipmentDtoToDomain = (dto: EquipmentDto): Equipment => {
    const { serial_number, equipment_model, equipment_category, ...rest } = dto;
    return {
        ...rest,
        serialNumber: serial_number,
        equipmentCategory: equipment_category,
        equipmentModel: equipment_model,
    }
}

export { mapEquipmentDtoToDomain };