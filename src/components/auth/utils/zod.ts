import { z } from 'zod';
import { passwordValidator } from './passwordValidator';

// 📌 Pierwotny schema, bez refine
const baseSignUpSchema = z.object({
    login: z.string().min(3, 'Login musi mieć co najmniej 3 znaki'),
    email: z.string().email('Niepoprawny adres email'),
    password: z.string().min(9, 'Hasło musi mieć co najmniej 9 znaków').refine(passwordValidator, {
        message: 'Password does not meet the required criteria',
    }),
    confirmPassword: z.string(),
});

// 📌 Cały schema do rejestracji
export const formSignUpSchema = baseSignUpSchema.refine(data => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
});

export type FormSignUpData = z.infer<typeof formSignUpSchema>;

// 📌 Login-only schema
export const loginOnlySchema = baseSignUpSchema.pick({ login: true });

// 📌 Email-only schema
export const emailOnlySchema = baseSignUpSchema.pick({ email: true });

// 📌 Password-only schema z osobnym refine
export const passwordOnlySchema = baseSignUpSchema.pick({ password: true, confirmPassword: true }).refine(data => data.password === data.confirmPassword, {
    message: 'Hasła muszą być takie same',
    path: ['confirmPassword'],
});

export const formLoginSchema = z.object({
    email: z.string().email('Niepoprawny adres email'),
    password: z.string().min(9, 'Hasło musi mieć co najmniej 9 znaków'),
});

export type FormLoginData = z.infer<typeof formLoginSchema>;
