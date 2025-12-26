import type {User} from "@/domain/entities/user.ts";
import type {RepairRequestStatus, UrgencyLevel} from "@/domain/entities/repair-request.ts";
import type {EquipmentDTO} from "@/infrastructure/dto/equipment.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface RepairRequestDTO {
    id: number;
    description: string;
    urgency_level: UrgencyLevel;
    manager_note: string | null;
    engineer_note: string | null;
    created_at: Date;
    updated_at: Date;

    photos: string[];
    failure_types: FailureType[];
    used_spare_parts: object[];
    state_history: RepairRequestStateDTO[];
    equipment: EquipmentDTO | null;
}

interface RepairRequestStateDTO {
    id: number;
    created_at: Date;
    status: RepairRequestStatus;
    responsible_user: User | null;
}

interface CreateRepairRequestStateDTO {
    status: RepairRequestStatus;
    responsible_user_id: number | null;
}

interface RepairRequestUsedSparePartDTO {
    id: number;
    quantity: number;
    spare_part: SparePart | null;
    institution: Institution | null;
}

interface UpdateRepairRequestDTO {
    id: string;
    manager_note: string | null;
    engineer_note: string | null;

    failure_types_ids: number[] | null;
    used_spare_parts_ids: number[] | null;
    state_history: CreateRepairRequestStateDTO | null;
}


export type { RepairRequestStateDTO, RepairRequestDTO, UpdateRepairRequestDTO, CreateRepairRequestStateDTO, RepairRequestUsedSparePartDTO };