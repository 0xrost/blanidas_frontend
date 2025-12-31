import type {EquipmentModelsRepository as EquipmentModelsRepositoryInterface} from "@/infrastructure/api/equipment-models.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {EquipmentModelsSorting} from "@/domain/query/equipment-models.query.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import type {EquipmentModel} from "@/domain/entities/equipment-model.ts";

class EquipmentModelsRepository implements EquipmentModelsRepositoryInterface {
    async list(pagination: Pagination, sorting: EquipmentModelsSorting): Promise<PaginationResponse<EquipmentModel>> {
        const response = await fetch(Endpoints.equipmentModels.list(pagination, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), (data: unknown): EquipmentModel => data as EquipmentModel);
    }
}

export { EquipmentModelsRepository };