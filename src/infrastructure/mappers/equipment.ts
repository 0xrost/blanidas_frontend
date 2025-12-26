import type {Equipment} from "@/domain/entities/equipment.ts";
import type {EquipmentDTO} from "@/infrastructure/dto/equipment.ts";

const mapApiEquipment = (api: EquipmentDTO): Equipment => {
    const { serial_number, equipment_model, equipment_category, ...rest } = api;
    return {
        ...rest,
        serialNumber: serial_number,
        equipmentCategory: equipment_category,
        equipmentModel: equipment_model,
    }
}

export { mapApiEquipment };