import z from 'zod';

export interface EditPostInputDTO {
    id: string;
    content: string;
}

export type EditPostOutputDTO = undefined;

export const EditPostSchema = z.object({
    id: z.string().min(1),
    content: z.string().min(3),
});
