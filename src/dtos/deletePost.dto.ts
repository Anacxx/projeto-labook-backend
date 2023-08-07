import z from 'zod';

export const DeletePostSchema = z.object({
  id: z.string().min(1),
});

export interface DeletePostOutputDTO {
  message: string;
}

export interface DeletePostInputDTO {
  id: string;
}