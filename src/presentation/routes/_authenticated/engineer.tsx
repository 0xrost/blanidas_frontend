import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";

export const Route = createFileRoute('/_authenticated/engineer')({
    component: () => <Outlet />,
    notFoundComponent: () => <NotFoundPage scope="dashboard" />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {redirect: location.href},
            });
        }

        if (context.authSession.currentUser.role !== "engineer") {
            throw redirect({ to: "/manager/dashboard/repair-requests", search: { page: 1, limit: 15 }});
        }
    },
})