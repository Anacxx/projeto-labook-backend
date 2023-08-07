import z from 'zod';
export interface LoginInputDTO {
    email: string;
    password: string;
}

export interface LoginOutputDTO {
    isValid: boolean;
}

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4), // Ajuste o comprimento mínimo conforme necessário
});
