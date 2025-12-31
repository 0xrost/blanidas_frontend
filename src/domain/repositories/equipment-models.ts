import type {EquipmentModelsSorting} from "@/domain/query/equipment-models.query.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

interface EquipmentModelsRepository {
    list(pagination: Pagination, sorting: EquipmentModelsSorting): Promise<PaginationResponse<EquipmentModel>>;
}

export type { EquipmentModelsRepository };