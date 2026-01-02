import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/manager')({
    component: () => <Outlet />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {redirect: location.href},
            });
        }

        if (context.authSession.currentUser.role !== "manager") {
            throw redirect({to: "/engineer/dashboard/repair-requests"});
        }
    },
})
