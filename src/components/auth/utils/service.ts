import { AuthenticationResponse, User } from '@/interfaces/IUser';
import { get, post, AUTH_URL, API_URL } from '@/lib/axios';
import { FormSignUpData } from './zod';
import { toast } from 'sonner';

export interface LoginPayload {
    email: string;
    password: string;
}

export async function login(payload: LoginPayload): Promise<void> {
    const response = await post<AuthenticationResponse>(`${AUTH_URL}/login`, payload);
    if (!response) {
        throw new Error('Error during login');
    }
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
}

export const register = async (data: FormSignUpData) => {
    try {
        const response = await post<AuthenticationResponse>(`${AUTH_URL}/register`, data);

        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        return response;
    } catch (error) {
        toast.error('Registration failed');
        throw error;
    }
};

export const authenticate = async (): Promise<User> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const user = await get<User>(`${API_URL}/users/me`);

        return user;
    } catch (error) {
        toast.error('Your session has expired. Please log in again.');

        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');

        throw error;
    }
};
