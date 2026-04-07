import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
        // Header padrão para JSON
        response.setHeader('Content-Type', 'application/json');
        const { url } = request;

        // 404 para rotas não mapeadas
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Route not found' }));
    },
);

const PORT = Number(process.env.PORT) || 3333;

server.listen(PORT, () =>
    console.log(`🚀 Server is running on http://localhost:${PORT}`),
);
