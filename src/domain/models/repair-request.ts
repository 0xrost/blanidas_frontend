import type {RepairRequestStatus, UrgencyLevel} from "@/domain/entities/repair-request.ts";

interface CreateRepairRequestState {
    status: RepairRequestStatus;
    responsibleUserId: number | null;
}

interface CreateRepairRequest {
    description: string;
    urgencyLevel: UrgencyLevel;
    equipmentId: string;
    photos: string[];
}

interface UpdateRepairRequest {
    id: string;
    managerNote: string | null;
    engineerNote: string | null;
    failureTypesIds: number[] | null;
    usedSparePartsIds: number[] | null;
    stateHistory: CreateRepairRequestState | null;
}

export type { CreateRepairRequest, UpdateRepairRequest, CreateRepairRequestState };
