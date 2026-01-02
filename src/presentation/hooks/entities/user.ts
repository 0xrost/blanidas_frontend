import {createUserUseCase, deleteUserUseCase, listUsersUseCase, updateUserUseCase} from "@/domain/useCases/users.ts";
import {createCrudHooks} from "@/presentation/hooks/entities/factory.ts";
import {UserRepository} from "@/dependencies.ts";

const user = createCrudHooks(
    "user",
    listUsersUseCase(UserRepository),
    createUserUseCase(UserRepository),
    updateUserUseCase(UserRepository),
    deleteUserUseCase(UserRepository)
);

const useUsers = user.useList;
const useCreateUser = user.useCreate;
const useUpdateUser = user.useUpdate;
const useDeleteUser = user.useDelete;

export {
    useUsers,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
};