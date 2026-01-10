type ErrorCode =
    "value already exists"
    | "invalid phone format"
    | "invalid email format";

class RequestError extends Error {
    readonly status: number;
    readonly code: ErrorCode;
    readonly message: string;
    readonly fields: string;

    constructor(status: number, code: ErrorCode, message: string, fields: string) {
        super(`Request failed: ${status}`);
        this.status = status;
        this.code = code;
        this.message = message;
        this.fields = fields;
    }
}

export { RequestError };
export type { ErrorCode };