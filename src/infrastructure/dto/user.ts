import type {Role} from "@/domain/auth/roles.ts";
import type {Institution} from "@/domain/entities/institution.ts";

interface UserDto {
    id: string;
    username: string;
    email: string;
    phone_number: string;
    role: Role;
    department: string;
    workplace: Institution | null;
    hire_at: Date;

    receive_low_stock_notification: boolean;
    receive_repair_request_created_notification: boolean;
}

interface UserCreateDto {
    username: string;
    email: string;
    phone_number: string;
    role: Role;
    department: string;
    workplace_id: string;
    password: string;
    hire_at: Date;

    receive_low_stock_notification: boolean;
    receive_repair_request_created_notification: boolean;
}

interface UserUpdateDto {
    id: string;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    phone_number?: string | null;
    role?: Role | null;
    department?: string | null;
    workplace_id?: string | null;
    hire_at?: Date | null;

    receive_low_stock_notification?: boolean | null;
    receive_repair_request_created_notification?: boolean | null;
}

export type {
    UserDto,
    UserUpdateDto,
    UserCreateDto,
};