import type {Role} from "@/domain/auth/roles.ts";
import type {Scope} from "@/domain/auth/scopes.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface UserDTO {
    id: string;
    username: string;
    email: string;
    phone_number: string;
    role: Role;
    scopes: Scope[];
    department: string;
    workplace: Institution;
    hire_at: Date;

    receive_low_stock_notification: boolean;
    receive_repair_request_created_notification: boolean;
}

export type { UserDTO };