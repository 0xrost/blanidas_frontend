import './main.css'

import ReactDOM from 'react-dom/client'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import AuthContextProvider from "@/context.tsx";
import App from "@/App.tsx";
import {StrictMode} from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            placeholderData: (prev: unknown) => prev,
        }
    }
})

const Root = (
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </QueryClientProvider>
    </StrictMode>
)

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(Root)