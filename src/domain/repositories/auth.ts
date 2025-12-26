import type {Session} from "@/domain/auth/session.ts";


export type LoginCommand = {
    email: string,
    password: string,
}

export interface AuthRepository {
    login(command: LoginCommand): Promise<Session>;
}