import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface LoginParams {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ email, password }: LoginParams): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<AuthResponse>('/api/auth/login', {
                email,
                password,
            });

            const data = response.data;

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            return data;
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || 'Login failed');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
