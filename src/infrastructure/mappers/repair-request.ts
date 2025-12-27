import type {
    CreateRepairRequestStateDTO, CreateRepairRequestUsedSparePartDTO,
    RepairRequestDTO,
    RepairRequestStateDTO, RepairRequestUsedSparePartDTO,
    UpdateRepairRequestDTO
} from "@/infrastructure/dto/repair-request.ts";
import type {RepairRequest, RepairRequestState, RepairRequestUsedSparePart} from "@/domain/entities/repair-request.ts";
import {mapApiEquipment} from "@/infrastructure/mappers/equipment.ts";
import type {
    CreateRepairRequestState,
    CreateRepairRequestUsedSparePart,
    UpdateRepairRequest
} from "@/domain/models/repair-request.ts";
import {mapApiInstitution} from "@/infrastructure/mappers/institution.ts";
import {mapSparePartDTOToDomain} from "@/infrastructure/mappers/spare-part.ts";

const mapRepairRequestUsedSparePartDTOToDomain = (dto: RepairRequestUsedSparePartDTO): RepairRequestUsedSparePart => {
    return {
        id: dto.id,
        note: dto.note,
        quantity: dto.quantity,
        institution: dto.institution ? mapApiInstitution(dto.institution) : null,
        sparePart: dto.spare_part ? mapSparePartDTOToDomain(dto.spare_part) : null,
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
        completedAt: api.completed_at,
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

const mapCreateRepairRequestUsedSparePartToDTO = (domain: CreateRepairRequestUsedSparePart): CreateRepairRequestUsedSparePartDTO => {
    return {
        quantity: domain.quantity,
        institution_id: domain.institutionId,
        spare_part_id: domain.sparePartId,
        note: domain.note,
    }
}

const mapUpdateRepairRequestToDTO = (model: UpdateRepairRequest): UpdateRepairRequestDTO => {
    const stateHistory = model.stateHistory ? mapCreateRepairRequestStateToDTO(model.stateHistory) : null;
    const usedSpareParts = model.usedSpareParts?.map(mapCreateRepairRequestUsedSparePartToDTO) ?? null;


    return {
        id: model.id,
        engineer_note: model.engineerNote,
        manager_note: model.managerNote,

        state_history: stateHistory,
        failure_types_ids: model.failureTypesIds,
        used_spare_parts: usedSpareParts,
    };
}

export { mapApiRepairRequestState, mapApiRepairRequest, mapUpdateRepairRequestToDTO }