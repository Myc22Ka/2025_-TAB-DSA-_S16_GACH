import { z } from 'zod';
import { passwordValidator } from './passwordValidator';
import { roles } from '@/interfaces/IUser';

export const validationMessages = {
    oldPasswordRequired: 'Old password is required',
    passwordMinLength: 'Password must be at least 9 characters',
    passwordCriteria: 'Password does not meet the required criteria',
    passwordsMismatch: 'Passwords must match',
    loginMinLength: 'Login must be at least 3 characters',
    invalidEmail: 'Invalid email address',
};

const baseSignUpSchema = z.object({
    login: z.string().min(3, validationMessages.loginMinLength),
    email: z.string().email(validationMessages.invalidEmail),
    password: z.string().min(9, validationMessages.passwordMinLength).refine(passwordValidator, {
        message: validationMessages.passwordCriteria,
    }),
    confirmPassword: z.string(),
});

export const formSignUpSchema = baseSignUpSchema.refine(data => data.password === data.confirmPassword, {
    message: validationMessages.passwordsMismatch,
    path: ['confirmPassword'],
});

export type FormSignUpData = z.infer<typeof formSignUpSchema>;

export const emailOnlySchema = baseSignUpSchema.pick({ email: true });

export const passwordOnlySchema = z
    .object({
        currentPassword: z.string().min(1, validationMessages.oldPasswordRequired),
        newPassword: z.string().min(9, validationMessages.passwordMinLength).refine(passwordValidator, {
            message: validationMessages.passwordCriteria,
        }),
        confirmationPassword: z.string(),
    })
    .refine(data => data.newPassword === data.confirmationPassword, {
        message: validationMessages.passwordsMismatch,
        path: ['confirmationPassword'],
    });

export const formLoginSchema = z.object({
    email: z.string().email(validationMessages.invalidEmail),
    password: z.string().min(9, validationMessages.passwordMinLength),
});

export type FormLoginData = z.infer<typeof formLoginSchema>;

export const roleSchema = z.object({
    role: z.enum(roles),
});

export type RoleFormValues = z.infer<typeof roleSchema>;

export type EmailFormValues = z.infer<typeof emailOnlySchema>;
export type PasswordFormValues = z.infer<typeof passwordOnlySchema>;
