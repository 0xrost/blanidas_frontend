import type {User} from "@/domain/entities/user.ts";
import type {RepairRequestStatus, UrgencyLevel} from "@/domain/entities/repair-request.ts";
import type {EquipmentDTO} from "@/infrastructure/dto/equipment.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {SparePartDTO} from "@/infrastructure/dto/spare-part.ts";
import type {InstitutionDTO} from "@/infrastructure/dto/institution.ts";

interface RepairRequestDTO {
    id: number;
    description: string;
    urgency_level: UrgencyLevel;
    manager_note: string;
    engineer_note: string;
    created_at: Date;
    completed_at: Date;

    photos: string[];
    failure_types: FailureType[];
    used_spare_parts: RepairRequestUsedSparePartDTO[];
    state_history: RepairRequestStateDTO[];
    equipment: EquipmentDTO;
}

interface RepairRequestStateDTO {
    id: number;
    created_at: Date;
    status: RepairRequestStatus;
    responsible_user: User | null;
}

interface CreateRepairRequestStateDTO {
    status: RepairRequestStatus;
    responsible_user_id: string | null;
}

interface RepairRequestUsedSparePartDTO {
    id: number;
    quantity: number;
    note: string;
    spare_part: SparePartDTO | null;
    institution: InstitutionDTO | null;
}

interface CreateRepairRequestUsedSparePartDTO {
    quantity: number;
    note: string;
    spare_part_id: number;
    institution_id: number;
}

interface UpdateRepairRequestDTO {
    id: string;
    manager_note: string | null;
    engineer_note: string | null;

    failure_types_ids: number[] | null;
    used_spare_parts: CreateRepairRequestUsedSparePartDTO[] | null;
    state_history: CreateRepairRequestStateDTO | null;
}


export type { RepairRequestStateDTO, RepairRequestDTO, UpdateRepairRequestDTO, CreateRepairRequestStateDTO, RepairRequestUsedSparePartDTO, CreateRepairRequestUsedSparePartDTO };