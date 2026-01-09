import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'


export const Route = createFileRoute('/_authenticated')({
    component: () => <Outlet />,
    beforeLoad: ({ context, location }) => {
        if (context.authSession === null) {
            throw redirect({
                to: '/accounts/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})
