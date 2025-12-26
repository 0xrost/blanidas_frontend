import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface EquipmentCategoryRepository {
    list(page: number, limit: number): Promise<EquipmentModel[]>;
}

export type { EquipmentCategoryRepository };