import type {User} from "@/domain/entities/user.ts";
import type {Token} from "@/domain/auth/token.ts";

interface Session {
    currentUser: User;
    token: Token;
}

export type { Session };