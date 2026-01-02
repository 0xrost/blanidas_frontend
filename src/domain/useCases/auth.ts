import type {AuthRepository} from "@/domain/repositories/auth.ts";
import type {UserLogin} from "@/domain/models/auth.ts";

const loginUseCase = (repo: AuthRepository) => {
    return async (data: UserLogin) => await repo.login(data);
}

export { loginUseCase };