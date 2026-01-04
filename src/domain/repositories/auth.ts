import type {AuthSession} from "@/domain/auth/session.ts";
import type {UserLogin} from "@/domain/models/auth.ts";
import type {Token} from "@/domain/auth/token.ts";

interface AuthRepository {
    login(command: UserLogin): Promise<AuthSession>;
    refresh(refreshToken: string): Promise<Token>;
}

export type { AuthRepository };