import type {Role} from "@/domain/auth/roles.ts";

interface UserCreate {
    username: string;
    email: string;
    phone: string;
    role: Role;
    department: string;
    workplaceId: string;
    password: string;
    hireAt: Date;

    receiveLowStockNotification: boolean;
    receiveRepairRequestCreatedNotification: boolean;
}

interface UserUpdate {
    id: string;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    phone?: string | null;
    role?: Role | null;
    department?: string | null;
    workplaceId?: string | null;
    hireAt?: Date | null;

    receiveLowStockNotification?: boolean | null;
    receiveRepairRequestCreatedNotification?: boolean | null;
}

export type { UserUpdate, UserCreate };