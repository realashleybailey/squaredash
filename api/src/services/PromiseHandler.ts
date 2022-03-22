import { ApiResponse } from "square";

export async function SquarePromiseHandler<T>(promise: Promise<ApiResponse<T>>): Promise<[Error | null, T | null]> {
    let data: ApiResponse<T>;
    try {
        data = await promise;
        return [null, data.result];
    } catch (err: any) {
        err.stack = [];
        if (typeof err.errors[0].detail === 'string') {
            err.message = err.errors[0].detail;
            err.stack = err.errors;
        }
        return [err, null];
    }
}
