class InvalidPageNumberError extends Error {
    constructor(page: number) {
        super(`Page must be >= 1, got ${page}`);
        this.name = "InvalidPageNumberError";
    }
}

class InvalidLimitError extends Error {
    constructor(limit: number) {
        super(`Limit must be >= 1 or -1, got ${limit}`);
        this.name = "InvalidLimitError";
    }
}

export { InvalidPageNumberError, InvalidLimitError };