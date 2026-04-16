import z from 'zod';

export const CreateEpisodeSchema = z.object({});
export type CreateEpisodeDTO = z.infer<typeof CreateEpisodeSchema>;

export const UpdateEpisodeSchema = z.object({});
export type UpdateEpisodeDTO = z.infer<typeof UpdateEpisodeSchema>;
