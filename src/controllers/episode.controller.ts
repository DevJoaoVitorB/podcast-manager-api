import { IncomingMessage, ServerResponse } from 'node:http';
import { AppError } from '@/errors/AppError';
import { EpisodeService } from '@/services/episode.service';
import { Episode } from '@prisma-client';
import {
    CreateEpisodeSchema,
    UpdateEpisodeSchema,
} from '@/schemas/episode.schema';
import { CuidSchema } from '@/schemas/general.schema';

export class EpisodeController {
    constructor(private service: EpisodeService) {}

    async create(request: IncomingMessage, response: ServerResponse) {
        const body = await this.parseBody(request);
        const result = CreateEpisodeSchema.safeParse(body);

        if (!result.success) throw new AppError('Invalid data', 400);

        const episode = await this.service.create(result.data);
        this.send<Episode>(response, 201, episode);
    }

    async findAll(request: IncomingMessage, response: ServerResponse) {
        const categoryIds = this.getCategoryIdsQueryParams(request);
        const episodes = await this.service.findAll(categoryIds);
        this.send<Episode[]>(response, 200, episodes);
    }

    async findById(request: IncomingMessage, response: ServerResponse) {
        const id = this.getIdUrlParams(request);
        const episode = await this.service.findById(id);
        this.send<Episode>(response, 200, episode);
    }

    async update(request: IncomingMessage, response: ServerResponse) {
        const id = this.getIdUrlParams(request);
        const body = await this.parseBody(request);
        const result = UpdateEpisodeSchema.safeParse(body);

        if (!result.success) throw new AppError('Invalid data', 400);

        const episode = await this.service.update(id, result.data);
        this.send<Episode>(response, 200, episode);
    }

    async delete(request: IncomingMessage, response: ServerResponse) {
        const id = this.getIdUrlParams(request);
        await this.service.delete(id);
        this.send(response, 204);
    }

    private async parseBody(request: IncomingMessage): Promise<unknown> {
        return new Promise((resolve, reject) => {
            let data = '';

            request.on('data', (chunk) => {
                data += chunk;
            });
            request.on('end', () => {
                try {
                    resolve(data ? JSON.parse(data) : {});
                } catch {
                    reject(new AppError('Invalid JSON', 400));
                }
            });
        });
    }

    private send<T>(response: ServerResponse, status: number, data?: T) {
        response.writeHead(status);
        response.end(data ? JSON.stringify(data) : undefined);
    }

    private getIdUrlParams(request: IncomingMessage) {
        const { url } = request;
        const id = url?.split('/')[2];
        const result = CuidSchema.safeParse(id);

        if (!result.success)
            throw new AppError('The provided CUID is missing or invalid', 400);

        return result.data;
    }

    private getCategoryIdsQueryParams(request: IncomingMessage) {
        const { url } = request;
        const parsedUrl = new URL(url ?? '', `http://${request.headers.host}`);
        const categoryIds = parsedUrl.searchParams
            .getAll('category')
            .map((id) => id.trim())
            .filter(Boolean);

        for (let i = 0; i < categoryIds.length; i++) {
            const categoryId = categoryIds[i];
            const result = CuidSchema.safeParse(categoryId);

            if (!result.success)
                throw new AppError(
                    'One or more category query params are invalid CUIDs',
                    400,
                );
        }

        return categoryIds;
    }
}
