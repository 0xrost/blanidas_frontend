import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Location} from "@/domain/entities/spare-part.ts";

interface SparePartDTO {
    id: number;
    name: string;
    serial_number: string;
    min_quality: number;
    compatible_models: EquipmentModel[];
    note: string | null;

    locations: Location[];
    supplier: Supplier | null;
    manufacturer: Manufacturer | null;
    spare_part_category: SparePartCategory | null;
}

export type { SparePartDTO };