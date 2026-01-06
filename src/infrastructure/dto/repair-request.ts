import type {User} from "@/domain/entities/user.ts";
import type {Status, Urgency} from "@/domain/entities/repair-request.ts";
import type {EquipmentDto} from "@/infrastructure/dto/equipment.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {SparePartDto} from "@/infrastructure/dto/spare-part.ts";
import type {InstitutionDto} from "@/infrastructure/dto/institution.ts";

interface RepairRequestDto {
    id: string;
    issue: string;
    urgency: Urgency;
    manager_note: string;
    engineer_note: string;
    created_at: Date;
    completed_at: Date;
    last_status: Status;

    photos: FileDto[];
    failure_types: FailureType[];
    used_spare_parts: UsedSparePartDto[];
    status_history: RepairRequestStatusRecordDto[];
    equipment: EquipmentDto;
}

interface FileDto {
    file_path: string;
}

interface RepairRequestStatusRecordDto {
    id: number;
    created_at: Date;
    status: Status;
    assigned_engineer: User | null;
}

interface RepairRequestStatusRecordCreateDto {
    assigned_engineer_id: string | null;
    status: Status;
}

interface UsedSparePartDto {
    id: number;
    quantity: number;
    note: string;
    spare_part: SparePartDto;
    institution: InstitutionDto;
}

interface UsedSparePartCreateDto {
    quantity: number;
    note: string;
    spare_part_id: string;
    institution_id: string;
}

interface RepairRequestUpdateDto {
    id: string;
    manager_note: string | null;
    engineer_note: string | null;

    failure_types_ids: string[] | null;
    used_spare_parts: UsedSparePartCreateDto[] | null;
    status_history: RepairRequestStatusRecordCreateDto | null;
}


export type { RepairRequestStatusRecordDto, RepairRequestDto, RepairRequestUpdateDto, RepairRequestStatusRecordCreateDto, UsedSparePartDto, UsedSparePartCreateDto };