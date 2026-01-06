import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";


export const Route = createFileRoute('/_authenticated')({
    component: () => <Outlet />,
    notFoundComponent: NotFoundPage,
    beforeLoad: ({ context, location }) => {
        console.log(location.pathname)
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
