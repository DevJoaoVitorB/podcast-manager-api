import { IncomingMessage, ServerResponse } from 'node:http';
import { AppError } from '@/errors/AppError';
import { CategoryService } from '@/services/category.service';
import { Category } from '@prisma-client';
import {
    CreateCategorySchema,
    UpdateCategorySchema,
} from '@/schemas/category.schema';
import { CuidSchema } from '@/schemas/general.schema';

export class CategoryController {
    constructor(private service: CategoryService) {}

    async create(request: IncomingMessage, response: ServerResponse) {
        const body = await this.parseBody(request);
        const result = CreateCategorySchema.safeParse(body);

        if (!result.success) throw new AppError('Invalid data', 400);

        const category = await this.service.create(result.data);
        this.send<Category>(response, 201, category);
    }

    async findAll(request: IncomingMessage, response: ServerResponse) {
        const categories = await this.service.findAll();
        this.send<Category[]>(response, 200, categories);
    }

    async findById(request: IncomingMessage, response: ServerResponse) {
        const id = this.getIdUrlParams(request);
        const category = await this.service.findById(id);
        this.send<Category>(response, 200, category);
    }

    async update(request: IncomingMessage, response: ServerResponse) {
        const id = this.getIdUrlParams(request);
        const body = await this.parseBody(request);
        const result = UpdateCategorySchema.safeParse(body);

        if (!result.success) throw new AppError('Invalid data', 400);

        const category = await this.service.update(id, result.data);
        this.send<Category>(response, 200, category);
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
}
