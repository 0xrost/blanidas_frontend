import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {InstitutionDto} from "@/infrastructure/dto/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";

interface EquipmentDto {
    id: number;
    location: string;
    serial_number: string;
    installed: Date;
    institution: InstitutionDto;
    equipment_model: EquipmentModel;
    equipment_category: EquipmentCategory;
    manufacturer: Manufacturer
}

export type { EquipmentDto };