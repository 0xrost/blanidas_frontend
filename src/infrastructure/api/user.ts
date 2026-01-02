import {type CRUDMappers, CRUDRepository} from "@/infrastructure/api/general.ts";
import type {UserRepository as UserRepositoryInterface} from "@/domain/repositories/users.ts";
import {Endpoints} from "@/infrastructure/endpoints.ts";
import type {User} from "@/domain/entities/user.ts";
import type {UserCreateDto, UserDto, UserUpdateDto} from "@/infrastructure/dto/user.ts";
import type {UserCreate, UserUpdate} from "@/domain/models/user.ts";
import {mapUserCreateDomainToDto, mapUserDtoToDomain, mapUserUpdateDomainToDto} from "@/infrastructure/mappers/user.ts";
import type {UserFilters, UserSortBy} from "@/domain/queries/user-list.query.ts";

const userMappers: CRUDMappers<
    User,
    UserDto,
    UserCreate,
    UserCreateDto,
    UserUpdate,
    UserUpdateDto
> = {
    model: mapUserDtoToDomain,
    create: mapUserCreateDomainToDto,
    update: mapUserUpdateDomainToDto,
}

class UserRepository extends CRUDRepository<
    User,
    UserDto,
    UserCreate,
    UserCreateDto,
    UserUpdate,
    UserUpdateDto,
    UserFilters,
    UserSortBy
> implements UserRepositoryInterface {
    constructor() {
        super(Endpoints.user, userMappers);
    }
}

export { UserRepository }