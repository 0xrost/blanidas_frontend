import type {EquipmentCategoryRepository as EquipmentCategoryRepositoryInterface} from "@/domain/repositories/equipment-category.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";

class EquipmentCategoryRepository implements EquipmentCategoryRepositoryInterface {
    async list(page: number, limit: number): Promise<EquipmentCategory[]> {
        const response = await fetch(Endpoints.equipmentCategory.list(page, limit));
        return (await response.json()).items;
    }
}

export { EquipmentCategoryRepository };