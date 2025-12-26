import type {Equipment} from "@/domain/entities/equipment.ts";
import type {User} from "@/domain/entities/user.ts";
import type {FailureType} from "@/domain/entities/failure-type.ts";
import type {SparePart} from "@/domain/entities/spare-part.ts";
import type {Institution} from "@/domain/entities/institution.ts";


type RepairRequestStatus = "in_progress" | "not_taken" | "waiting_spare_parts" | "finished";

interface RepairRequestState {
    id: number;
    createdAt: Date;
    status: RepairRequestStatus;
    responsibleUser: User | null; // assignedEngineer
}

interface RepairRequestUsedSparePart {
    id: number;
    quantity: number;
    sparePart: SparePart | null;
    institution: Institution | null;
}

interface RepairRequest {
    id: number;
    description: string; // issue
    urgencyLevel: UrgencyLevel;
    managerNote: string | null;
    engineerNote: string | null;
    createdAt: Date;
    updatedAt: Date;

    photos: string[];
    failureTypes: FailureType[];
    usedSpareParts: RepairRequestUsedSparePart[];
    stateHistory: RepairRequestState[];
    equipment: Equipment | null;
}

type UrgencyLevel = "critical" | "non_critical";

export type { RepairRequestState, UrgencyLevel, RepairRequest, RepairRequestStatus, RepairRequestUsedSparePart };
