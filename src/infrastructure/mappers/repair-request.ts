import type {
    RepairRequestStatusRecordCreateDto, UsedSparePartCreateDto,
    RepairRequestDto,
    RepairRequestStatusRecordDto, UsedSparePartDto,
    RepairRequestUpdateDto
} from "@/infrastructure/dto/repair-request.ts";
import type {RepairRequest, RepairRequestStatusRecord, UsedSparePart} from "@/domain/entities/repair-request.ts";
import {mapEquipmentDtoToDomain} from "@/infrastructure/mappers/equipment.ts";
import type {
    RepairRequestStatusRecordCreate,
    UsedSparePartCreate,
    RepairRequestUpdate
} from "@/domain/models/repair-request.ts";
import {mapInstitutionDtoToDomain} from "@/infrastructure/mappers/institution.ts";
import {mapSparePartDtoToDomain} from "@/infrastructure/mappers/spare-part.ts";

const mapUsedSparePartDtoToDomain = (dto: UsedSparePartDto): UsedSparePart => {
    return {
        id: dto.id,
        note: dto.note,
        quantity: dto.quantity,
        institution: mapInstitutionDtoToDomain(dto.institution),
        sparePart: mapSparePartDtoToDomain(dto.spare_part),
    }
}

const mapRepairRequestDtoToDomain = (dto: RepairRequestDto): RepairRequest => {
    return {
        id: dto.id,
        issue: dto.issue,
        urgency: dto.urgency,
        managerNote: dto.manager_note,
        engineerNote: dto.engineer_note,
        createdAt: dto.created_at,
        completedAt: dto.completed_at,
        lastStatus: dto.last_status,
        photos: dto.photos.map(x => x.file_path),
        failureTypes: dto.failure_types,
        usedSpareParts: dto.used_spare_parts.map(mapUsedSparePartDtoToDomain),
        statusHistory: dto.status_history.map(mapRepairRequestStatusRecordDtoToDomain),
        equipment: dto.equipment && mapEquipmentDtoToDomain(dto.equipment)
    }
}

const mapRepairRequestStatusRecordDtoToDomain = (dto: RepairRequestStatusRecordDto): RepairRequestStatusRecord => {
    return {
        id: dto.id,
        createdAt: dto.created_at,
        status: dto.status,
        assignedEngineer: dto.assigned_engineer,
    }
}

const mapRepairRequestStatusRecordCreateDomainToDto = (domain: RepairRequestStatusRecordCreate): RepairRequestStatusRecordCreateDto => {
    return {
        status: domain.status,
        assigned_engineer_id: domain.assignedEngineerId,
    };
}

const mapUsedSparePartCreateDomainToDto = (domain: UsedSparePartCreate): UsedSparePartCreateDto => {
    return {
        quantity: domain.quantity,
        institution_id: domain.institutionId,
        spare_part_id: domain.sparePartId,
        note: domain.note,
    }
}

const mapRepairRequestUpdateDomainToDto = (model: RepairRequestUpdate): RepairRequestUpdateDto => {
    const stateHistory = model.statusHistory ? mapRepairRequestStatusRecordCreateDomainToDto(model.statusHistory) : null;
    const usedSpareParts = model.usedSpareParts?.map(mapUsedSparePartCreateDomainToDto) ?? null;

    return {
        id: model.id,
        engineer_note: model.engineerNote,
        manager_note: model.managerNote,

        status_history: stateHistory,
        failure_types_ids: model.failureTypesIds,
        used_spare_parts: usedSpareParts,
    };
}

export { mapRepairRequestStatusRecordDtoToDomain, mapRepairRequestDtoToDomain, mapRepairRequestUpdateDomainToDto }