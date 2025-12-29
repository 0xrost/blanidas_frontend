import type {AuthSessionDto, TokenDto} from "@/infrastructure/dto/auth.ts";
import type {Token} from "@/domain/auth/token.ts";
import type {AuthSession} from "@/domain/auth/session.ts";
import {mapUserDtoToDomain} from "@/infrastructure/mappers/user.ts";

const mapAuthSessionDtoToDomain = (dto: AuthSessionDto): AuthSession => {
    return {
        currentUser: mapUserDtoToDomain(dto.current_user),
        token: mapTokenDtoToDomain(dto.token),
    }
}

const mapTokenDtoToDomain = (dto: TokenDto): Token => {
    return {
        accessToken: dto.access_token,
        refreshToken: dto.refresh_token,
        tokenType: dto.token_type,
    }
}

export { mapAuthSessionDtoToDomain };
