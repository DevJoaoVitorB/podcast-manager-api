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
        return this.prisma.episode.create({ data });
    }

    async findAll() {
        return this.prisma.episode.findMany();
    }

    async findById(id: CuidDTO) {
        return this.prisma.episode.findUnique({ where: { id } });
    }

    async findUnique(where: Prisma.EpisodeWhereUniqueInput) {
        return this.prisma.episode.findUnique({ where });
    }

    async update(
        id: CuidDTO,
        data: Pick<
            Prisma.EpisodeUpdateInput,
            'youtubeId' | 'title' | 'channel' | 'categories'
        >,
    ) {
        return this.prisma.episode.update({ where: { id }, data });
    }

    async delete(id: CuidDTO) {
        return this.prisma.episode.delete({ where: { id } });
    }
}
