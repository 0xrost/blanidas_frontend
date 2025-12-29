import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Manufacturer} from "@/domain/entities/manufacturer.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {Location} from "@/domain/entities/spare-part.ts";
import type {SupplierDto} from "@/infrastructure/dto/supplier.ts";

interface SparePartDto {
    id: string;
    name: string;
    min_quantity: number;
    compatible_models: EquipmentModel[];
    note: string | null;

    locations: Location[];
    supplier: SupplierDto;
    manufacturer: Manufacturer;
    spare_part_category: SparePartCategory;
}

interface LocationCreateDto {
    quantity: number;
    institution_id: string;
}

interface SparePartUpdateDto {
    id: string;
    name?: string;
    min_quantity?: number;
    compatible_models_ids?: number[];
    note?: string;

    locations?: LocationCreateDto[];
    supplier_id?: number;
    manufacturer_Id?: number;
    sparePartCategory_id?: number;
}

export type {
    SparePartDto,
    LocationCreateDto,
    SparePartUpdateDto,
};