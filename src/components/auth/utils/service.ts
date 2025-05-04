import { AuthenticationResponse, User } from '@/interfaces/IUser';
import { get, post, AUTH_URL, API_URL } from '@/lib/axios';
import { FormSignUpData } from './zod';
import { toast } from 'sonner';

export const register = async (data: FormSignUpData) => {
    try {
        const response = await post<AuthenticationResponse>(`${AUTH_URL}/register`, data);

        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        return response;
    } catch (error) {
        toast.error('Rejestracja nie powiodła się');
        throw error;
    }
};

export const authenticate = async (): Promise<User> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Brak tokenu autoryzacyjnego');
    }

    try {
        const user = await get<User>(`${API_URL}/users/me`);
        return user;
    } catch (error) {
        toast.error('Nie można pobrać danych użytkownika');
        throw error;
    }
};
