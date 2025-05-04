import { AuthenticationResponse } from '@/interfaces/IUser';
import { post, AUTH_URL } from '@/lib/axios';
import { FormSignUpData } from './zod';

const register = async (data: FormSignUpData) => {
    try {
        const response = await post<AuthenticationResponse>(`${AUTH_URL}/register`, data);

        return response;
    } catch (error) {
        throw error;
    }
};

export default register;
