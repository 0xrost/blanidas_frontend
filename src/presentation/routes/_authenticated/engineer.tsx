import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";
import {defaultSearch} from "@/presentation/routes/_authenticated/repair-requests";

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
            throw redirect({ to: "/repair-requests", search: { ...defaultSearch, page: "1", limit: "15" }});
        }
    },
})