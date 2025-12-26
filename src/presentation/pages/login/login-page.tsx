import LoginForm from "@/presentation/pages/login/login-form.tsx";
import BaseLayout from "@/presentation/components/layouts/base-layout.tsx";
import {useAuthSession, useLogin} from "@/presentation/hooks/auth.ts";
import {Navigate} from "@tanstack/react-router";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const session = useAuthSession();
    const { mutate, reset, isError, isPending } = useLogin();

    if (session) {
        const redirectTo =
            session.currentUser.role === "manager"
                ? "/manager/panel/"
                : "engineer/panel/";
        return <Navigate to={"/repair-request/$equipmentId"}/>
    }


    return (
        <BaseLayout>
            <LoginForm sendForm={mutate} isSubmitting={isPending} isError={isError} resetError={reset} />
        </BaseLayout>
    );
}

export default LoginPage;
export type { LoginFormData };