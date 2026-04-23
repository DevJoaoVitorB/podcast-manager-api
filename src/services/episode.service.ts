import { AppError } from '@/errors/AppError';
import { EpisodeRepository } from '@/repositories/episode.repository';
import {
    CreateEpisodeDTO,
    CreateEpisodeSchema,
    UpdateEpisodeDTO,
    UpdateEpisodeSchema,
} from '@/schemas/episode.schema';
import { CuidDTO, CuidSchema } from '@/schemas/general.schema';

export class EpisodeService {
    constructor(private repository: EpisodeRepository) {}

    async create(data: CreateEpisodeDTO) {
        const result = CreateEpisodeSchema.parse(data);

        const { title, youtubeId, channel, categoryIds } = result;

        await this.validateData(result);
        const episode = await this.repository.create({
            title,
            youtubeId,
            channel,
            categories: { connect: categoryIds.map((id) => ({ id })) },
        });

        return episode;
    }

    async findAll(filters?: CuidDTO[]) {
        return this.repository.findAll(filters);
    }

    async findById(id: CuidDTO) {
        const episodeId = CuidSchema.parse(id);
        const episode = await this.repository.findById(episodeId);

        if (!episode) throw new AppError('Episode not found', 404);

        return episode;
    }

    async update(id: CuidDTO, data: UpdateEpisodeDTO) {
        await this.findById(id);

        if (Object.keys(data).length === 0)
            throw new AppError('No data provided for update', 400);

        const result = UpdateEpisodeSchema.parse(data);

        await this.validateData(result, id);
        const episode = await this.repository.update(id, result);

        return episode;
    }

    async delete(id: CuidDTO) {
        await this.findById(id);
        await this.repository.delete(id);
    }

    private async validateData(
        data: CreateEpisodeDTO | UpdateEpisodeDTO,
        currentId?: string,
    ) {
        const { youtubeId } = data;
        const existingYoutubeId = await this.repository.findUnique({
            youtubeId,
        });

        if (existingYoutubeId && existingYoutubeId.id !== currentId)
            throw new AppError(
                'A episode with this YouTube video ID already exists.',
                409,
            );
    }
}
