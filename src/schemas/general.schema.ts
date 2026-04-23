import z from 'zod';

export const CuidSchema = z.string().cuid('Invalid CUID format.');
export type CuidDTO = z.infer<typeof CuidSchema>;