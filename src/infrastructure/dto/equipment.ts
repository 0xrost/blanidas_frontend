import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface EquipmentDTO {
    id: number;
    location: string;
    serial_number: string;
    installed: Date;
    institution: null | Institution;
    equipment_model: null | EquipmentModel;
    equipment_category: null | object;
    manufacturer: null | object;
}

export type { EquipmentDTO };