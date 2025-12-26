import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface Location {
    id: number;
    quantity: number;
    institution: Institution | null;
}

interface SparePart {
    id: number;
    name: string;
    serialNumber: string;
    minQuality: number;
    compatibleModels: EquipmentModel[];
    note: string | null;

    locations: Location[];
    supplier: Supplier | null;
    manufacturer: Manufacturer | null;
    sparePartCategory: SparePartCategory | null;
}

export type { SparePart, Location };