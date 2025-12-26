import type {AuthRepository, LoginCommand} from "@/domain/repositories/auth.ts";

const login =
    (repo: AuthRepository) =>
        async (command: LoginCommand) => await repo.login(command);

export { login };


/*
* import {useMutation} from "@tanstack/react-query";
import {UserRepository} from "@/dependencies.ts";
import type {LoginCommand} from "@/domain/repositories/auth.ts";
import {useContext} from "react";
import {AuthContext} from "@/context.tsx";
import type {Session} from "@/domain/auth/session.ts";

const useLoginUser = () => {
    const { set } = useContext(AuthContext);

    return useMutation<Session, unknown, LoginCommand, unknown>({
        mutationFn: (command) => UserRepository.login(command),
        onSuccess: (response) => {set()}
    })
}



export { useLoginUser };
*
* */