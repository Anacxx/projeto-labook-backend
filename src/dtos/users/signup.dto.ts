import z from 'zod';
export interface SignupInputDTO {
    name: string;
    email: string;
    password: string;
  }

  export interface SignupOutputDTO {
    message: string;
    token: string
  }
  export const SignupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(4), // Ajuste o comprimento mínimo conforme necessário
  }).transform(data => data as SignupInputDTO)
