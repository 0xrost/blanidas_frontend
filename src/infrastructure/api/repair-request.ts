import type {RepairRequestRepository as RepairRequestRepositoryInterface} from "@/domain/repositories/repair-request.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import {imageMimeToExtension} from "@/utils.ts";
import {mapRepairRequestDtoToDomain, mapRepairRequestUpdateDomainToDto} from "@/infrastructure/mappers/repair-request.ts";
import type {RepairRequestCreate, RepairRequestUpdate} from "@/domain/models/repair-request.ts";
import type {RepairRequest} from "@/domain/entities/repair-request.ts";
import type {RepairRequestFilters, RepairRequestSortBy} from "@/domain/queries/repair-request-list.query.ts";
import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {RepairRequestDto, RepairRequestUpdateDto} from "@/infrastructure/dto/repair-request.ts";
import {emptyDomainToDtoMapper} from "@/infrastructure/mappers/mapper.ts";
import {RequestError} from "@/infrastructure/errors.ts";

const repairRequestMappers: CRUDMappers<
    RepairRequest,
    RepairRequestDto,
    RepairRequestCreate,
    RepairRequestCreate,
    RepairRequestUpdate,
    RepairRequestUpdateDto
> = {
    model: mapRepairRequestDtoToDomain,
    create: emptyDomainToDtoMapper,
    update: mapRepairRequestUpdateDomainToDto,
}

class RepairRequestRepository extends CRUDRepository<
    RepairRequest,
    RepairRequestDto,
    RepairRequestCreate,
    RepairRequestCreate,
    RepairRequestUpdate,
    RepairRequestUpdateDto,
    RepairRequestFilters,
    RepairRequestSortBy
> implements RepairRequestRepositoryInterface {
    constructor() {
        super(Endpoints.repairRequest, repairRequestMappers);
    }

    async get(id: string): Promise<RepairRequest> {
        const json = await CRUDRepository.request<RepairRequestDto>(Endpoints.repairRequest.get(id));
        return this.mappers.model(json);
    }

    async create(data: RepairRequestCreate): Promise<RepairRequest> {
        const formData = new FormData()
        formData.append("issue", data.description)
        formData.append("equipment_id", data.equipmentId)
        formData.append("urgency", data.urgencyLevel)

        const photoBlobs = await Promise.all(data.photos.map(async (url) => {
            try {
                const blob = await fetch(url).then(r => r.blob());
                const ext = imageMimeToExtension(blob.type);
                if (!ext) return null;
                const filename = Math.random().toString(36).substring(2, 15) + "." + ext;
                return { blob, filename };
            } catch {
                return null;
            }
        }));

        photoBlobs.forEach(p => p && formData.append("photos", p.blob, p.filename));

        const response = await fetch(Endpoints.repairRequest.create(), {
            method: "POST",
            body: formData,
        })

        const json = await response.json();
        if (!response.ok) throw new RequestError(response.status, json.code, json.message, json.fields);

        return mapRepairRequestDtoToDomain(json)
    }
}

export { RepairRequestRepository };