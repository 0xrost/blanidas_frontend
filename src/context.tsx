import {createContext, useEffect, useState} from "react";
import type {AuthSession} from "@/domain/auth/session.ts";
import {AuthService} from "@/dependencies.ts";

interface AuthContextType {
    session: AuthSession | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

type AuthContextProviderProps = { children: React.ReactNode };
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [contextData, setContextData] = useState<AuthContextType>({session: AuthService.getSession()});

    useEffect(() => {
        const listener = (session: AuthSession | null) => { setContextData({session: session}) };
        const unsubscribe = AuthService.subscribe(listener);
        return () => void unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export { AuthContext }