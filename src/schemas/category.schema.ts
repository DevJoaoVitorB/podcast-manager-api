import z from 'zod';

// Fields
export const NameSchema = z
    .string()
    .trim()
    .min(1, 'Name cannot be empty.')
    .max(255, 'Name cannot exceed 255 characters.');
export type NameDTO = z.infer<typeof NameSchema>;

export const SlugSchema = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format.');
export type SlugDTO = z.infer<typeof SlugSchema>;

// Objects
export const BaseDataSchema = z.object({
    name: NameSchema,
    slug: SlugSchema,
});
export type BaseDataDTO = z.infer<typeof BaseDataSchema>;

export const CreateCategorySchema = z.object({
    name: NameSchema,
});
export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.partial();
export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;
