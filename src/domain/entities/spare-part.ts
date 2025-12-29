import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Institution} from "@/domain/entities/institution.ts";

type SparePartStatus = "in_stock" | "low_stock" | "out_of_stock";

interface Location {
    id: string;
    quantity: number;
    institution: Institution;
}

interface SparePart {
    id: string;
    name: string;
    minQuantity: number;
    compatibleModels: EquipmentModel[];
    note: string | null;

    locations: Location[];
    supplier: Supplier;
    manufacturer: Manufacturer;
    sparePartCategory: SparePartCategory;
}

export type { SparePart, Location, SparePartStatus };