import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/engineer')({
    component: () => <Outlet />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {redirect: location.href},
            });
        }

        if (context.authSession.currentUser.role !== "engineer") {
            throw redirect({to: "/manager/dashboard/repair-requests"});
        }
    },
})