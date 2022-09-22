export class GamajunApiError extends Error {
    private readonly _endpoint: string;
    private readonly _httpCode: number;

    constructor(endpoint: string, httpCode: number) {
        super(`Request to Gamajun endpoint ${endpoint} failed: HTTP code ${httpCode}`); // (1)
        this.name = "GamajunApiError";
        this._endpoint = endpoint;
        this._httpCode = httpCode;
    }

    get httpCode(): number {
        return this._httpCode;
    }

    get endpoint(): string {
        return this._endpoint;
    }
}