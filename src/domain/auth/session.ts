import type {User} from "@/domain/entities/user.ts";
import type {Token} from "@/domain/auth/token.ts";

interface AuthSession {
    currentUser: User;
    token: Token;
}

export type { AuthSession };