import { toast } from 'sonner';

export const passwordValidator = (password: string) => {
    const validationErrors: string[] = [];

    if (password.length < 9) {
        validationErrors.push('Hasło musi mieć co najmniej 9 znaków');
        return null;
    }

    if (password === password.toLowerCase()) {
        validationErrors.push('Hasło musi zawierać co najmniej jedną wielką literę');
        return null;
    }

    if (!/\d/.test(password)) {
        validationErrors.push('Hasło musi zawierać co najmniej jedną cyfrę');
        return null;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        validationErrors.push('Hasło musi zawierać co najmniej jeden znak specjalny');
        return null;
    }

    if (validationErrors.length > 0) {
        validationErrors.forEach(error => toast.error(error));
        return null;
    }

    return password;
};
