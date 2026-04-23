import { AppError } from '@/errors/AppError';
import { CategoryRepository } from '@/repositories/category.repository';
import {
    BaseDataDTO,
    BaseDataSchema,
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from '@/schemas/category.schema';
import { CuidDTO, CuidSchema } from '@/schemas/general.schema';

export class CategoryService {
    constructor(private repository: CategoryRepository) {}

    async create(data: CreateCategoryDTO) {
        const name = data.name;
        const slug = this.slugGenerator(data.name);
        const result = BaseDataSchema.parse({ name, slug });

        await this.validateData(result);
        const category = await this.repository.create(result);

        return category;
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: CuidDTO) {
        const categoryId = CuidSchema.parse(id);
        const category = await this.repository.findById(categoryId);

        if (!category) throw new AppError('Category not found', 404);

        return category;
    }

    async update(id: CuidDTO, data: UpdateCategoryDTO) {
        await this.findById(id);

        if (!data.name) throw new AppError('No data provided for update', 400);

        const name = data.name;
        const slug = await this.slugGenerator(data.name);
        const result = BaseDataSchema.parse({ name, slug });

        await this.validateData(result, id);
        const category = await this.repository.update(id, result);

        return category;
    }

    async delete(id: CuidDTO) {
        await this.findById(id);
        await this.repository.delete(id);
    }

    private slugGenerator(name: string) {
        return name
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]|[^\w\s-]+/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    private async validateData(data: BaseDataDTO, currentId?: string) {
        const { name, slug } = data;

        const [existingName, existingSlug] = await Promise.all([
            await this.repository.findUnique({ name }),
            await this.repository.findUnique({ slug }),
        ]);

        const issues = [];

        if (existingName && existingName.id !== currentId) issues.push('name');

        if (existingSlug && existingSlug.id !== currentId) issues.push('slug');

        if (issues.length > 0)
            throw new AppError(
                `A category with this ${issues.join(' and ')} already exists`,
                409,
            );
    }
}
