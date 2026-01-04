import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Institution} from "@/domain/entities/institution.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";

type Status = "working" | "not_working" | "under_maintenance";

interface Equipment {
    id: string;
    location: string;
    serialNumber: string;
    installed: Date;
    model: EquipmentModel;
    institution: Institution;
    category: EquipmentCategory;
    manufacturer: Manufacturer;
}

export type { Equipment, Status };