import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";

interface EquipmentCategoryRepository {
    list(pagination: Pagination): Promise<PaginationResponse<EquipmentModel>>;
}

export type { EquipmentCategoryRepository };