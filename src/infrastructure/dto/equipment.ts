import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {InstitutionDto} from "@/infrastructure/dto/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {Status} from "@/domain/entities/equipment.ts";

interface EquipmentDto {
    id: string;
    location: string;
    serial_number: string;
    installed: Date;
    status: Status;
    institution: InstitutionDto;
    equipment_model: EquipmentModel;
    equipment_category: EquipmentCategory | null;
    manufacturer: Manufacturer | null;
}

interface EquipmentQrDataDto {
    id: string;
    serial_number: string;
    institution_name: string;
}


interface EquipmentCreateDto {
    location: string;
    serial_number: string;
    installed: Date;
    equipment_model_id: string;
    institution_id: string;
    equipment_category_id: string;
    manufacturer_id: string;
}

interface EquipmentUpdateDto {
    id: string;
    location?: string | null;
    serial_number?: string | null;
    installed?: Date | null;
    equipment_model_id?: string | null;
    institution_id?: string | null;
    equipment_category_id?: string | null;
    manufacturer_id?: string | null;
}

export type {
    EquipmentDto,
    EquipmentCreateDto,
    EquipmentUpdateDto,
    EquipmentQrDataDto,
};