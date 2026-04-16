import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { errorHandler } from './middlewares/error.middleware';
import { categoryController } from '@/container';
import { categoryRoutes } from './routes/category.routes';

const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
        // Header Pattern
        response.setHeader('Content-Type', 'application/json');
        const { url } = request;

        try {
            if (url?.startsWith('/categories'))
                return await categoryRoutes(request, response, categoryController);

            // if (url?.startsWith('/episodes'))
            //     return await episodeRoutes(request, response, episodeController);

            // Route not found - 404
            response.writeHead(404);
            response.end(JSON.stringify({ message: 'Route not found' }));
        } catch (error) {
            errorHandler(response, error);
        }
    },
);

const PORT = Number(process.env.PORT) || 3333;

server.listen(PORT, '0.0.0.0', () =>
    console.log(`🚀 Server is running on http://localhost:${PORT}`),
);
