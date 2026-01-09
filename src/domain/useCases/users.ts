import type {UserRepository} from "@/domain/repositories/user.ts";
import type {UserFilters, UserSortBy} from "@/domain/queries/user-list.query.ts";
import type {User} from "@/domain/entities/user.ts";
import type {UserCreate, UserUpdate} from "@/domain/models/user.ts";
import {createCrudUseCases} from "@/domain/useCases/factory.ts";

const UserUseCases = createCrudUseCases<User, UserCreate, UserUpdate, UserFilters, UserSortBy, UserRepository>();

export const {
    list: listUsersUseCase,
    create: createUserUseCase,
    update: updateUserUseCase,
    delete: deleteUserUseCase
} = UserUseCases;
