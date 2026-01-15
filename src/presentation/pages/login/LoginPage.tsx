import LoginForm from "@/presentation/pages/login/LoginForm.tsx";
import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import {useAuthSession, useLogin} from "@/presentation/hooks/auth.ts";
import {Route} from "@/presentation/routes/accounts/login.tsx";
import {useEffect} from "react";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const session = useAuthSession();
    const { mutate, reset, isError, isPending } = useLogin();
    const navigate = Route.useNavigate();

    useEffect(() => {
        if (!session) return;

        navigate({
            to: session.currentUser.role === "manager"
                ? "/manager/dashboard/statistics"
                : "/engineer/dashboard/repair-requests",
            search: { page: 1, limit: 15 },
        });
    }, [session, navigate]);

    return (
        <BaseLayout>
            <LoginForm sendForm={mutate} isSubmitting={isPending} isError={isError} resetError={reset} />
        </BaseLayout>
    );
}

export default LoginPage;
export type { LoginFormData };