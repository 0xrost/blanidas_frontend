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

interface EquipmentCreateDto {
    location: string;
    serial_number: string;
    installed: Date;
    model_id: string;
    institution_id: string;
    category_id: string;
    manufacturer_id: string;
}

interface EquipmentUpdateDto {
    location?: string | null;
    serial_number?: string | null;
    installed?: Date | null;
    model_id?: string | null;
    institution_id?: string | null;
    categorya_id?: string | null;
    manufacturer_id?: string | null;
}

export type {
    EquipmentDto,
    EquipmentCreateDto,
    EquipmentUpdateDto,
};