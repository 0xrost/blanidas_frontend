import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import './main.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import AuthContextProvider from "@/context.tsx";
import {useAuthSession} from "@/presentation/hooks/auth.ts";
import {setTokenProvider} from "@/infrastructure/fetch.ts";
import {AuthService} from "@/dependencies.ts";

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: { authSession: null }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            placeholderData: (prev: unknown) => prev,
        }
    }
})

const App = () => {
    const authSession = useAuthSession();
    return <RouterProvider router={router} context={{ authSession }} />;
}

setTokenProvider(() => AuthService.getSession()?.token.accessToken ?? null)

const Root = (
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </QueryClientProvider>
)

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(Root)