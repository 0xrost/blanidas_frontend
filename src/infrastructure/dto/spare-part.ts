import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {SparePartCategory} from "@/domain/entities/spare-part-category.ts";
import type {StockStatus} from "@/domain/entities/spare-part.ts";
import type { InstitutionDto } from "./institution";

interface SparePartDto {
    id: string;
    name: string;
    min_quantity: number;
    total_quantity: number;
    stock_status: StockStatus;
    compatible_models: EquipmentModel[];
    note: string | null;

    locations: LocationDto[];
    spare_part_category: SparePartCategory | null;
}

interface LocationDto {
    id: string
    quantity: number;
    restored_quantity: number;
    institution: InstitutionDto;
}

interface LocationCreateDto {
    quantity: number;
    restored_quantity: number;
    institution_id: string;
}

interface SparePartUpdateDto {
    id: string;
    name?: string | null;
    min_quantity?: number | null;
    compatible_models_ids?: string[] | null;

    locations?: LocationCreateDto[] | null;
    spare_part_category_id?: string | null;
}

interface SparePartCreateDto {
    name: string;
    min_quantity: number;
    compatible_models_ids: string[];
    spare_part_category_id: string;
}

export type {
    SparePartDto,
    LocationCreateDto,
    SparePartUpdateDto,
    SparePartCreateDto,
    LocationDto,
};