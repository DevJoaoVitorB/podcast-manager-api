import { IncomingMessage, ServerResponse } from 'node:http';
import { EpisodeController } from '@/controllers/episode.controller';

export const episodeRoutes = async (
    request: IncomingMessage,
    response: ServerResponse,
    controller: EpisodeController,
) => {
    const { method, url } = request;
    const pathname = new URL(url ?? '/', `http://${request.headers.host}`).pathname;

    if (method === 'POST' && pathname === '/episodes')
        return await controller.create(request, response);

    if (method === 'GET' && pathname === '/episodes')
        return await controller.findAll(request, response);

    if (method === 'GET' && pathname.startsWith('/episodes/'))
        return await controller.findById(request, response);

    if (method === 'PATCH' && pathname.startsWith('/episodes/'))
        return await controller.update(request, response);

    if (method === 'DELETE' && pathname.startsWith('/episodes/'))
        return await controller.delete(request, response);
};
