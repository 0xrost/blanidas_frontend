import type {Equipment} from "@/domain/entities/equipment.ts";
import type {User} from "@/domain/entities/user.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";


type Status = "in_progress" | "not_taken" | "waiting_spare_parts" | "finished";
type Urgency = "critical" | "non_critical";

interface RepairRequestStatusRecord {
    id: number;
    createdAt: Date;
    status: Status;
    assignedEngineer: User | null;
}

interface UsedSparePart {
    id: number;
    note: string;
    quantity: number;
    sparePart: SparePart;
    institution: Institution;
}

interface RepairRequest {
    id: string;
    urgency: Urgency;
    issue: string;
    managerNote: string;
    engineerNote: string;
    createdAt: Date;
    completedAt: Date | null;

    photos: string[];
    failureTypes: FailureType[];
    usedSpareParts: UsedSparePart[];
    statusHistory: RepairRequestStatusRecord[];
    equipment: Equipment;
}

export type { RepairRequestStatusRecord, Urgency, RepairRequest, Status, UsedSparePart };
