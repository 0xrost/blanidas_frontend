import LoginForm from "@/presentation/pages/login/LoginForm.tsx";
import BaseLayout from "@/presentation/components/layouts/BaseLayout.tsx";
import {useAuthSession, useLogin} from "@/presentation/hooks/auth.ts";
import {Route} from "@/presentation/routes/accounts/login.tsx";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const session = useAuthSession();
    const { mutate, reset, isError, isPending } = useLogin();
    const navigate = Route.useNavigate();

    if (session) {
        navigate({
            to: session.currentUser.role === "manager"
                ? "/engineer/dashboard/repair-requests"
                : "/engineer/dashboard/repair-requests"
        })
    }

    return (
        <BaseLayout>
            <LoginForm sendForm={mutate} isSubmitting={isPending} isError={isError} resetError={reset} />
        </BaseLayout>
    );
}

export default LoginPage;
export type { LoginFormData };