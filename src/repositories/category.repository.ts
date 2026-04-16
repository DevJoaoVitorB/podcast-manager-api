import { CuidDTO } from '@/schemas/general.schema';
import { Prisma, PrismaClient } from '@prisma-client';

export class CategoryRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: Pick<Prisma.CategoryCreateInput, 'name' | 'slug'>) {
        return this.prisma.category.create({ data });
    }

    async findAll() {
        return this.prisma.category.findMany();
    }

    async findById(id: CuidDTO) {
        return this.prisma.category.findUnique({ where: { id } });
    }

    async findUnique(where: Prisma.CategoryWhereUniqueInput) {
        return this.prisma.category.findUnique({ where });
    }

    async update(
        id: CuidDTO,
        data: Pick<Prisma.CategoryUpdateInput, 'name' | 'slug'>,
    ) {
        return this.prisma.category.update({ where: { id }, data });
    }

    async delete(id: CuidDTO) {
        return this.prisma.category.delete({ where: { id } });
    }
}
