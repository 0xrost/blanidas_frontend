import type {AuthRepository as AuthRepositoryInterface} from "@/domain/repositories/auth.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {AuthSession} from "@/domain/auth/session.ts";
import {mapAuthSessionDtoToDomain, mapTokenDtoToDomain} from "@/infrastructure/mappers/auth.ts";
import {jsonRequestHeaders} from "@/infrastructure/api/headers.ts";
import type {UserLogin} from "@/domain/models/auth.ts";
import type {Token} from "@/domain/auth/token.ts";

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

    async refresh(refreshToken: string): Promise<Token> {
        const response = await fetch(Endpoints.auth.refresh(), {
            ...jsonRequestHeaders,
            method: "POST",
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        })

        return mapTokenDtoToDomain(await response.json());
    }
}

export { AuthRepository };