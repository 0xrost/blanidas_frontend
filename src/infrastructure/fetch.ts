type TokenProviderFn = () => string | null;

let tokenProvider = (): string | null => null;
const setTokenProvider = (func: TokenProviderFn) => {tokenProvider = func};

const fetchWithAuth = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const token = tokenProvider();
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return fetch(input, {...init, headers})
};

export { fetchWithAuth, setTokenProvider };