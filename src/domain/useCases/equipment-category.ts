import type {EquipmentCategoryRepository} from "@/domain/repositories/equipment-category.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";

const listEquipmentCategory =
    (repo: EquipmentCategoryRepository) =>
        async (page: number, limit: number): Promise<EquipmentCategory[]> => repo.list(page, limit);

export { listEquipmentCategory };