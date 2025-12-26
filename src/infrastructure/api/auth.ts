import type {AuthRepository as AuthRepositoryInterface, LoginCommand} from "@/domain/repositories/auth.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {Session} from "@/domain/auth/session.ts";
import {mapApiSession} from "@/infrastructure/mappers/auth.ts";

class AuthRepository implements AuthRepositoryInterface {
    async login(command: LoginCommand): Promise<Session> {
        const response = await fetch(Endpoints.auth.login(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: command.email,
                password: command.password,
            }),
        })

        return mapApiSession(await response.json());
    }
}

export { AuthRepository };