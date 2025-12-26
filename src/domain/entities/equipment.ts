import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";

interface Equipment {
    id: number;
    location: string;
    serialNumber: string;
    installed: Date;
    institution: null | Institution;
    equipmentModel: null | EquipmentModel;
    equipmentCategory: null | EquipmentCategory;
    manufacturer: null | object;
}

export type { Equipment };