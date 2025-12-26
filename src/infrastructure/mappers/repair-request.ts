import type {
    CreateRepairRequestStateDTO,
    RepairRequestDTO,
    RepairRequestStateDTO, RepairRequestUsedSparePartDTO,
    UpdateRepairRequestDTO
} from "@/infrastructure/dto/repair-request.ts";
import type {RepairRequest, RepairRequestState, RepairRequestUsedSparePart} from "@/domain/entities/repair-request.ts";
import {mapApiEquipment} from "@/infrastructure/mappers/equipment.ts";
import type {CreateRepairRequestState, UpdateRepairRequest} from "@/domain/models/repair-request.ts";
import {mapApiInstitution} from "@/infrastructure/mappers/institution.ts";

const mapRepairRequestUsedSparePartDTOToDomain = (dto: RepairRequestUsedSparePartDTO): RepairRequestUsedSparePart => {
    return {
        id: dto.id,
        quantity: dto.quantity,
        institution: mapApiInstitution(dto.institution),
        sparePart: mapSpare
    }
}

const mapApiRepairRequest = (api: RepairRequestDTO): RepairRequest => {
    return {
        id: api.id,
        description: api.description,
        urgencyLevel: api.urgency_level,
        managerNote: api.manager_note,
        engineerNote: api.engineer_note,
        createdAt: api.created_at,
        updatedAt: api.updated_at,
        photos: api.photos,
        failureTypes: api.failure_types,
        usedSpareParts: api.used_spare_parts.map(mapRepairRequestUsedSparePartDTOToDomain),
        stateHistory: api.state_history.map(mapApiRepairRequestState),
        equipment: api.equipment && mapApiEquipment(api.equipment)
    }
}

const mapApiRepairRequestState = (api: RepairRequestStateDTO): RepairRequestState => {
    return {
        id: api.id,
        createdAt: api.created_at,
        status: api.status,
        responsibleUser: api.responsible_user,
    }
}

const mapCreateRepairRequestStateToDTO = (model: CreateRepairRequestState): CreateRepairRequestStateDTO => {
    return {
        status: model.status,
        responsible_user_id: model.responsibleUserId,
    };
}

const mapUpdateRepairRequestToDTO = (model: UpdateRepairRequest): UpdateRepairRequestDTO => {
    const stateHistory = model.stateHistory ? mapCreateRepairRequestStateToDTO(model.stateHistory) : null;

    return {
        id: model.id,
        engineer_note: model.engineerNote,
        manager_note: model.managerNote,

        state_history: stateHistory,
        failure_types_ids: model.failureTypesIds,
        used_spare_parts_ids: model.usedSparePartsIds,
    };
}

export { mapApiRepairRequestState, mapApiRepairRequest, mapUpdateRepairRequestToDTO }