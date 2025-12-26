import type {UserDTO} from "@/infrastructure/dto/user.ts";

interface SessionDTO {
    current_user: UserDTO;
    token: TokenDTO;
}

interface TokenDTO {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export type { SessionDTO, TokenDTO };