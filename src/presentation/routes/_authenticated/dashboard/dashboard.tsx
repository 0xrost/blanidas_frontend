import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/dashboard')({
    component: () => <Outlet />,
    notFoundComponent: () => <NotFoundPage scope="dashboard" />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {redirect: location.href},
            });
        }
    },
})