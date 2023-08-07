import z from 'zod';
export interface SignupInputDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }

  export interface SignupOutputDTO {
    message: string;
    user: {
      id: string;
      name: string;
    };
  }
  export const SignupSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(4), // Ajuste o comprimento mínimo conforme necessário
    role: z.string().min(1),
  });
