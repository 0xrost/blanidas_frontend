import type {ListQuery} from "@/domain/list-query.ts";
import type {Role} from "@/domain/auth/roles.ts";

type UserSortBy = "username";
interface UserFilters {
    username?: string;
    role?: Role;
}

type UserListQuery = ListQuery<UserFilters, UserSortBy>;

export type {
    UserListQuery,
    UserFilters,
    UserSortBy,
}