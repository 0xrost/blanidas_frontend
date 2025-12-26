import type {SessionDTO, TokenDTO} from "@/infrastructure/dto/auth.ts";
import type {Token} from "@/domain/auth/token.ts";
import type {Session} from "@/domain/auth/session.ts";
import {mapApiUser} from "@/infrastructure/mappers/user.ts";

const mapApiSession = (api: SessionDTO): Session => {
    return {
        currentUser: mapApiUser(api.current_user),
        token: mapApiToken(api.token),
    }
}

const mapApiToken = (api: TokenDTO): Token => {
    return {
        accessToken: api.access_token,
        refreshToken: api.refresh_token,
        tokenType: api.token_type,
    }
}

export { mapApiSession };
