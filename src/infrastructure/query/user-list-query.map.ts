import type {FilterDefinition} from "@/infrastructure/query/map.ts";
import type {UserFilters, UserSortBy} from "@/domain/queries/user-list.query.ts";

const userFilterMap: Record<keyof UserFilters, FilterDefinition> = {
    username: {
        field: "username",
        operator: "ilike",
    },
    role: {
        field: "role",
        operator: "eq",
    }
};

const userSortMap: Record<UserSortBy, string> = { username: "username" };

export { userFilterMap, userSortMap };