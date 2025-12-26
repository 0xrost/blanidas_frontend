import type {Role} from "@/domain/auth/roles.ts";
import type {Scope} from "@/domain/auth/scopes.ts";
import type {Institution} from "@/domain/entities/institution.ts";


interface User {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: Role;
    scopes: Scope[];
    department: string;
    workplace: Institution;
    hireAt: Date;

    receiveLowStockNotification: boolean;
    receiveRepairRequestCreatedNotification: boolean;
}

export type { User };