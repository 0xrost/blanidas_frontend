import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NotFoundPage from "@/presentation/pages/not-found/NotFoundPage.tsx";
import type {AuthSession} from "@/domain/auth/session.ts";

const RootLayout = () => (
    <>
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

interface RouterContext {
    authSession: AuthSession | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    notFoundComponent: NotFoundPage,
})