import { IncomingMessage, ServerResponse } from 'node:http';
import { CategoryController } from '@/controllers/category.controller';

export const categoryRoutes = async (
    request: IncomingMessage,
    response: ServerResponse,
    controller: CategoryController,
) => {
    const { method, url } = request;

    if (method === 'POST' && url === '/categories')
        return await controller.create(request, response);

    if (method === 'GET' && url === '/categories')
        return await controller.findAll(request, response);

    if (method === 'GET' && url?.startsWith('/categories/'))
        return await controller.findById(request, response);

    if (method === 'PATCH' && url?.startsWith('/categories/'))
        return await controller.update(request, response);

    if (method === 'DELETE' && url?.startsWith('/categories/'))
        return await controller.delete(request, response);
};
