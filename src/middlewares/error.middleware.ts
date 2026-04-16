import { ServerResponse } from 'http';
import z, { ZodError } from 'zod';
import { AppError } from '@/errors/AppError';

export function errorHandler(res: ServerResponse, error: unknown) {
    // 1. ZodError
    if (error instanceof ZodError) {
        res.writeHead(400);
        return res.end(
            JSON.stringify({
                errors: {...z.treeifyError(error)},
            }),
        );
    }

    // 2. AppError
    if (error instanceof AppError) {
        res.writeHead(error.statusCode);
        return res.end(
            JSON.stringify({
                message: error.message,
            }),
        );
    }

    // 3. Unknown error
    console.error(`Unexpected Error: ${error}`);
    res.writeHead(500);
    return res.end(
        JSON.stringify({
            message: 'Internal server error',
        }),
    );
}
