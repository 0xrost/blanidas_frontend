import type {AuthRepository as AuthRepositoryInterface} from "@/domain/repositories/auth.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {AuthSession} from "@/domain/auth/session.ts";
import {mapAuthSessionDtoToDomain} from "@/infrastructure/mappers/auth.ts";
import jsonRequestHeaders from "@/infrastructure/api/headers.ts";
import type {UserLogin} from "@/domain/models/auth.ts";

class AuthRepository implements AuthRepositoryInterface {
    async login(command: UserLogin): Promise<AuthSession> {
        const response = await fetch(Endpoints.auth.login(), {
            ...jsonRequestHeaders,
            method: "POST",
            body: JSON.stringify({
                email: command.email,
                password: command.password,
            }),
        })

        return mapAuthSessionDtoToDomain(await response.json());
    }
}

export { AuthRepository };