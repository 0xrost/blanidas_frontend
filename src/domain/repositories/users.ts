import type {UserFilters, UserSortBy} from "@/domain/queries/user-list.query.ts";
import type {User} from "@/domain/entities/user.ts";
import type {UserCreate, UserUpdate} from "@/domain/models/user.ts";
import type {CRUDRepository} from "@/domain/repositories/general.ts";

interface UserRepository extends CRUDRepository<
    User,
    UserCreate,
    UserUpdate,
    UserFilters,
    UserSortBy
> {}

export type { UserRepository };