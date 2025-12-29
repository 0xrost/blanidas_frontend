import type {AuthRepository} from "@/domain/repositories/auth.ts";
import type {UserLogin} from "@/domain/models/auth.ts";

const loginUseCase =
    (repo: AuthRepository) =>
        async (command: UserLogin) => await repo.login(command);

export { loginUseCase };