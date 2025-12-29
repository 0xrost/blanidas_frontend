import type {UserDto} from "@/infrastructure/dto/user.ts";

interface AuthSessionDto {
    current_user: UserDto;
    token: TokenDto;
}

interface TokenDto {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export type { AuthSessionDto, TokenDto };