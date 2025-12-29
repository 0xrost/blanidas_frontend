import type {EquipmentCategoryRepository as EquipmentCategoryRepositoryInterface} from "@/domain/repositories/equipment-category.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {EquipmentCategory} from "@/domain/entities/equipment-category.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";

class EquipmentCategoryRepository implements EquipmentCategoryRepositoryInterface {
    async list(pagination: Pagination): Promise<PaginationResponse<EquipmentCategory>> {
        const response = await fetch(Endpoints.equipmentCategory.list(pagination));
        return await response.json();
    }
}

export { EquipmentCategoryRepository };