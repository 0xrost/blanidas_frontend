import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";
import {defaultSearch} from "@/presentation/routes/_authenticated/manager/dashboard/repair-requests";

export const Route = createFileRoute('/_authenticated/manager')({
    component: () => <Outlet />,
    notFoundComponent: () => <NotFoundPage scope="dashboard" />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {redirect: location.href},
            });
        }

        if (context.authSession.currentUser.role !== "manager" && context.authSession.currentUser.role !== "admin") {
            throw redirect({ to: "/engineer/dashboard/repair-requests", search: { ...defaultSearch, page: "1", limit: "15" }});
        }
    },
})
