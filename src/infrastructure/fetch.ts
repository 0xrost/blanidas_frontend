import type {Token} from "@/domain/auth/token.ts";

type TokenProviderFn = () => string | null;
type RefreshTokenFn = () => Promise<Token>;

let tokenProvider: TokenProviderFn = () => null;
let refreshToken: RefreshTokenFn = async () => {
    throw new Error("Refresh token handler not set");
};

const setTokenProvider = (fn: TokenProviderFn) => {
    tokenProvider = fn;
};

const setRefreshToken = (fn: RefreshTokenFn) => {
    refreshToken = fn;
};

let refreshPromise: Promise<Token> | null = null;

type ListenerFn = () => void;
const listeners: ListenerFn[] = [];

const subscribeOnTokenExpire = (fn: ListenerFn) => {
    listeners.push(fn);
};

class AuthExpiredError extends Error {
    constructor() {
        super("Authentication expired");
        this.name = "AuthExpiredError";
    }
}

let expiredEmitted = false;

const emitExpired = () => {
    if (expiredEmitted) return;
    expiredEmitted = true;
    listeners.forEach(fn => fn());
};

const fetchWithAuth = async (
    input: RequestInfo | URL,
    init?: RequestInit,
    isRetry = false
): Promise<Response> => {
    const token = tokenProvider();

    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(input, {
        ...init,
        headers,
    });

    if (response.status !== 401) return response;
    if (isRetry) throw new AuthExpiredError();

    if (!refreshPromise) {
        refreshPromise = refreshToken().finally(() => {
            refreshPromise = null;
        });
    }

    try {
        await refreshPromise;
    } catch {
        emitExpired();
        throw new AuthExpiredError();
    }

    return fetchWithAuth(input, init, true);
};

export { fetchWithAuth, setTokenProvider, setRefreshToken, subscribeOnTokenExpire };