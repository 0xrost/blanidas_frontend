import type {RepairRequestStatus, UrgencyLevel} from "@/domain/entities/repair-request.ts";

interface CreateRepairRequestState {
    status: RepairRequestStatus;
    responsibleUserId: string | null;
}

interface CreateRepairRequest {
    description: string;
    urgencyLevel: UrgencyLevel;
    equipmentId: string;
    photos: string[];
}

interface CreateRepairRequestUsedSparePart {
    quantity: number
    note: string | null
    sparePartId: number
    institutionId: number
}

interface UpdateRepairRequest {
    id: string;
    managerNote: string | null;
    engineerNote: string | null;
    failureTypesIds: number[] | null;
    usedSpareParts: CreateRepairRequestUsedSparePart[] | null;
    stateHistory: CreateRepairRequestState | null;
}

export type { CreateRepairRequest, UpdateRepairRequest, CreateRepairRequestState, CreateRepairRequestUsedSparePart };
