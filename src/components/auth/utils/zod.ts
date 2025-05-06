import { z } from 'zod';
import { passwordValidator } from './passwordValidator';

export const formSignUpSchema = z
    .object({
        login: z.string().min(3, 'Login musi mieć co najmniej 3 znaki'),
        email: z.string().email('Niepoprawny adres email'),
        password: z.string().min(9, 'Hasło musi mieć co najmniej 6 znaków').refine(passwordValidator, {
            message: 'Password does not meet the required criteria',
        }),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Hasła muszą być takie same',
        path: ['confirmPassword'],
    });

export type FormSignUpData = z.infer<typeof formSignUpSchema>;

export const formLoginSchema = z.object({
    email: z.string().email('Niepoprawny adres email'),
    password: z.string().min(9, 'Hasło musi mieć co najmniej 9 znaków'),
});

export type FormLoginData = z.infer<typeof formLoginSchema>;
