import z from 'zod';
export interface CreatePostInputDTO {
    id: string, 
    creator_id: string, 
    content: string
}

export type CreatePostOutputDTO = undefined


export const CreatePostSchema = z.object({
    id: z.string().min(1),
    creator_id: z.string().min(1),
    content: z.string().min(3),
})