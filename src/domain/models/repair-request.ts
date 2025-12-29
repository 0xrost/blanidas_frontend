import type {Status, Urgency} from "@/domain/entities/repair-request.ts";

interface RepairRequestStatusRecordCreate {
    assignedEngineerId: string | null;
    status: Status;
}

interface RepairRequestCreate {
    description: string;
    urgencyLevel: Urgency;
    equipmentId: string;
    photos: string[];
}

interface UsedSparePartCreate {
    quantity: number
    note: string
    sparePartId: string
    institutionId: string
}

interface RepairRequestUpdate {
    id: string;
    managerNote: string | null;
    engineerNote: string | null;
    failureTypesIds: number[] | null;
    usedSpareParts: UsedSparePartCreate[] | null;
    statusHistory: RepairRequestStatusRecordCreate | null;
}

export type { RepairRequestCreate, RepairRequestUpdate, RepairRequestStatusRecordCreate, UsedSparePartCreate };
