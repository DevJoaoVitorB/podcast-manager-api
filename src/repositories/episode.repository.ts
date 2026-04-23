import { CuidDTO } from '@/schemas/general.schema';
import { Prisma, PrismaClient } from '@prisma-client';

export class EpisodeRepository {
    constructor(private prisma: PrismaClient) {}

    async create(
        data: Pick<
            Prisma.EpisodeCreateInput,
            'youtubeId' | 'title' | 'channel' | 'categories'
        >,
    ) {
        return this.prisma.episode.create({
            data,
            include: { categories: true },
        });
    }

    async findAll(filters?: CuidDTO[]) {
        const where: Prisma.EpisodeWhereInput | undefined =
            filters && filters.length > 0
                ? {
                      categories: {
                          some: {
                              id: {
                                  in: filters,
                              },
                          },
                      },
                  }
                : undefined;

        return this.prisma.episode.findMany({
            where,
            include: { categories: true },
        });
    }

    async findById(id: CuidDTO) {
        return this.prisma.episode.findUnique({
            where: { id },
            include: { categories: true },
        });
    }

    async findUnique(where: Prisma.EpisodeWhereUniqueInput) {
        return this.prisma.episode.findUnique({
            where,
            include: { categories: true },
        });
    }

    async update(
        id: CuidDTO,
        data: Pick<
            Prisma.EpisodeUpdateInput,
            'youtubeId' | 'title' | 'channel' | 'categories'
        >,
    ) {
        return this.prisma.episode.update({
            where: { id },
            data,
            include: { categories: true },
        });
    }

    async delete(id: CuidDTO) {
        return this.prisma.episode.delete({ where: { id } });
    }
}
