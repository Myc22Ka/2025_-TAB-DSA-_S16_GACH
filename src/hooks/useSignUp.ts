import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type RegisterRequest = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

type AuthenticationResponse = {
    accessToken: string;
    refreshToken: string;
};

export function useSignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AuthenticationResponse | null>(null);

    const register = async (form: RegisterRequest) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<AuthenticationResponse>('/api/auth/register', form);
            setData(response.data);
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;

            if (axiosError.response?.data?.message) {
                setError(axiosError.response.data.message);
            } else if (axiosError.message) {
                setError(axiosError.message);
            } else {
                setError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        error,
        data,
    };
}
