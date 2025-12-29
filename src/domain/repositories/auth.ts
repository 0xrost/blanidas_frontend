import type {AuthSession} from "@/domain/auth/session.ts";
import type {UserLogin} from "@/domain/models/auth.ts";

interface AuthRepository {
    login(command: UserLogin): Promise<AuthSession>;
}

export type { AuthRepository };