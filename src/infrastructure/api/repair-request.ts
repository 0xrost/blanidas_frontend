import type {RepairRequestRepository as RepairRequestRepositoryInterface} from "@/domain/repositories/repair-request.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {imageMimeToExtension} from "@/utils.ts";
import {mapRepairRequestDtoToDomain, mapRepairRequestUpdateDomainToDto} from "@/infrastructure/mappers/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {RepairRequestFilters, RepairRequestSorting}from "@/domain/query/repair-request.query.ts";
import {mapPaginationResponseDtoToDomain} from "@/infrastructure/mappers/pagination.ts";
import jsonRequestHeaders from "@/infrastructure/api/headers.ts";

class RepairRequestRepository implements RepairRequestRepositoryInterface {
    async list(pagination: Pagination, filters: RepairRequestFilters, sorting: RepairRequestSorting): Promise<PaginationResponse<RepairRequest>> {
        const response = await fetch(Endpoints.repairRequest.list(pagination, filters, sorting));
        return mapPaginationResponseDtoToDomain(await response.json(), mapRepairRequestDtoToDomain)
    }

    async get(id: string): Promise<RepairRequest> {
        const response = await fetch(Endpoints.repairRequest.get(id));
        return mapRepairRequestDtoToDomain(await response.json());
    }

    async create(data: RepairRequestCreate): Promise<RepairRequest> {
        const formData = new FormData()
        formData.append("issue", data.description)
        formData.append("equipment_id", data.equipmentId)
        formData.append("urgency", data.urgencyLevel)

        for (let i = 0; i < data.photos.length; i++) {
            const blob = await fetch(data.photos[i]).then((response) => response.blob())
            const fileExtension = imageMimeToExtension(blob.type)
            if (!fileExtension) {
                continue
            }

            const filename = Math.random().toString(36).substring(2, 15) + "." + fileExtension;
            formData.append("photos", blob, filename)
        }

        const response = await fetch(Endpoints.repairRequest.create(), {
            method: "POST",
            body: formData,
        })

        return mapRepairRequestDtoToDomain(await response.json())
    }

    async update(data: RepairRequestUpdate): Promise<RepairRequest> {
        const dataDto = mapRepairRequestUpdateDomainToDto(data);
        const response = await fetch(Endpoints.repairRequest.update(), {
            ...jsonRequestHeaders,
            method: "PUT",
            body: JSON.stringify(dataDto),
        })

        return mapRepairRequestDtoToDomain(await response.json())
    }

    async delete(id: string): Promise<null> {
        const response = await fetch(Endpoints.repairRequest.delete(id), {
            ...jsonRequestHeaders,
            method: "DELETE",
            body: `{id:${id}}`,
        })
        return await response.json()
    }
}

export { RepairRequestRepository };