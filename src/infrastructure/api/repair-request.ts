import type {RepairRequestRepository as RepairRequestRepositoryInterface} from "@/domain/repositories/repair-request.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {imageMimeToExtension} from "@/utils.ts";
import {mapApiRepairRequest, mapUpdateRepairRequestToDTO} from "@/infrastructure/mappers/repair-request.ts";
import type {Pagination, PaginationResponse} from "@/domain/models/pagination.ts";
import type {CreateRepairRequest, UpdateRepairRequest} from "@/domain/models/repair-request.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {RepairRequestFilters, RepairRequestOrderBy} from "@/domain/filters/repair-request.filters.ts";
import {excludeNullFields} from "@/infrastructure/utils.ts";
import {mapPaginationResponseDTOToDomain} from "@/infrastructure/mappers/pagination.ts";
import type {RepairRequestDTO} from "@/infrastructure/dto/repair-request.ts";

class RepairRequestRepository implements RepairRequestRepositoryInterface {
    async create(command: CreateRepairRequest): Promise<RepairRequest> {
        const data = new FormData()
        data.append("description", command.description)
        data.append("equipment_id", command.equipmentId)
        data.append("urgency_level", command.urgencyLevel)

        for (let i = 0; i < command.photos.length; i++) {
            const blob = await fetch(command.photos[i]).then((response) => response.blob())
            const fileExtension = imageMimeToExtension(blob.type)
            if (!fileExtension) {
                continue
            }

            const filename = Math.random().toString(36).substring(2, 15) + "." + fileExtension;
            data.append("photos", blob, filename)
        }

        const response = await fetch(Endpoints.repairRequest.create(), {
            method: "POST",
            body: data,
        })

        return mapApiRepairRequest(await response.json())
    }

    async update(command: UpdateRepairRequest): Promise<RepairRequest> {
        const commandDTO = mapUpdateRepairRequestToDTO(command);
        const response = await fetch(Endpoints.repairRequest.update(), {
            method: "PUT",
            body: JSON.stringify(commandDTO, excludeNullFields),
        })

        return mapApiRepairRequest(await response.json())
    }

    async list(pagination: Pagination, filters: RepairRequestFilters, orderBy: RepairRequestOrderBy): Promise<PaginationResponse<RepairRequest[]>> {
        const response = await fetch(Endpoints.repairRequest.list(pagination, filters, orderBy));
        return mapPaginationResponseDTOToDomain(await response.json(), (x) => mapApiRepairRequest(x as RepairRequestDTO))
    }

    async get(id: string): Promise<RepairRequest> {
        const response = await fetch(Endpoints.repairRequest.get(id));
        return mapApiRepairRequest(await response.json());
    }
}

export { RepairRequestRepository };