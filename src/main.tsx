import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import './main.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import AuthContextProvider from "@/context.tsx";

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient()

const Root = (
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </QueryClientProvider>
)

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(Root)