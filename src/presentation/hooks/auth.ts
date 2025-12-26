import {useContext} from "react";
import {AuthContext} from "@/context.tsx";
import {AuthService} from "@/dependencies.ts";
import {useMutation} from "@tanstack/react-query";
import type {LoginCommand} from "@/domain/repositories/auth.ts";

const useAuthSession = () => {
    const { session } = useContext(AuthContext);
    return session;
}

const useLogin = () => {
    return useMutation<void, unknown, LoginCommand, unknown>({
        mutationFn: async (command) => {
            await AuthService.login(command.email, command.password)
        }
    })
}

const useLogout = () => {
    return AuthService.logout;
};


export { useAuthSession, useLogout, useLogin };