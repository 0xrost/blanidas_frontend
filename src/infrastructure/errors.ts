class RequestError extends Error {
    constructor(status: number) {
        super(`Request failed: ${status}`);
    }
}

export { RequestError };