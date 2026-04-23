import z from 'zod';
import { CuidSchema } from './general.schema';

// Fields
export const EpisodeTitleSchema = z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters.')
    .max(255, 'Title cannot exceed 255 characters.');

export const YoutubeIdSchema = z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_-]{11}$/, 'Invalid YouTube video ID format.');

export const EpisodeChannelSchema = z
    .string()
    .trim()
    .min(5, 'Channel must be at least 5 characters.')
    .max(255, 'Channel cannot exceed 255 characters.');

export const EpisodeCategoryIdsSchema = z
    .array(CuidSchema)
    .min(1, 'Category IDs cannot be empty.');

export const CreateEpisodeSchema = z.object({
    title: EpisodeTitleSchema,
    youtubeId: YoutubeIdSchema,
    channel: EpisodeChannelSchema,
    categoryIds: EpisodeCategoryIdsSchema,
});
export type CreateEpisodeDTO = z.infer<typeof CreateEpisodeSchema>;

export const UpdateEpisodeSchema = CreateEpisodeSchema.partial();
export type UpdateEpisodeDTO = z.infer<typeof UpdateEpisodeSchema>;
