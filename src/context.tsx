import {createContext, useEffect, useState} from "react";
import type {Session} from "@/domain/auth/session.ts";
import {AuthService} from "@/dependencies.ts";

interface AuthContextType {
    session: Session | null;
}

const localSessionJSON = localStorage.getItem("session");
const localSession: Session | null = localSessionJSON ? JSON.parse(localSessionJSON) : null;
const initialState: AuthContextType = { session: localSession };

const AuthContext = createContext<AuthContextType>(initialState)

type AuthContextProviderProps = { children: React.ReactNode };
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [contextData, setContextData] = useState<AuthContextType>(initialState);
    useEffect(() => {
        const listener = (session: Session | null) => {
            localStorage.setItem("session", JSON.stringify(session));
            setContextData({ session: session });
        }
        AuthService.subscribe(listener);

        return () => {
            AuthService.unsubscribe(listener);
        };
    }, []);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export { AuthContext }