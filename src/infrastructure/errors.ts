class RequestError extends Error {
    status: number;

    constructor(status: number) {
        super(`Request failed: ${status}`);
        this.status = status;
    }
}

export { RequestError };