import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Location, StockStatus} from "@/domain/entities/spare-part.ts";
import type {Supplier} from "@/domain/entities/supplier.ts";

interface SparePartDto {
    id: string;
    name: string;
    min_quantity: number;
    total_quantity: number;
    stock_status: StockStatus;
    compatible_models: EquipmentModel[];
    note: string | null;

    locations: Location[];
    supplier: Supplier | null;
    manufacturer: Manufacturer | null;
    spare_part_category: SparePartCategory | null;
}

interface LocationCreateDto {
    quantity: number;
    institution_id: string;
}

interface SparePartUpdateDto {
    id: string;
    name?: string | null;
    min_quantity?: number | null;
    compatible_models_ids?: string[] | null;

    locations?: LocationCreateDto[] | null;
    supplier_id?: string | null;
    manufacturer_Id?: string | null;
    spare_part_category_id?: string | null;
}

interface SparePartCreateDto {
    name: string;
    min_quantity: number;
    compatible_models_ids: string[];
    supplier_id: string;
    manufacturer_id: string;
    spare_part_category_id: string;
}

export type {
    SparePartDto,
    LocationCreateDto,
    SparePartUpdateDto,
    SparePartCreateDto,
};