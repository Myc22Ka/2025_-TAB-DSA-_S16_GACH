import { ApiError, RequestConfig } from '@/interfaces/IAxios';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const BASE_URL = `http://${import.meta.env.VITE_PLATFORM_URL}:${import.meta.env.VITE_BACKEND_PORT}` || 'http://localhost:8080';
export const API_URL = `${BASE_URL}/api`;
export const AUTH_URL = `${BASE_URL}/api/auth`;

// Create Axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        indexes: null,
    },
});

// Add request interceptor to add auth token to every request
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Error handling interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

// Main request function
export const request = <T>({ method, url, data, params }: RequestConfig): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
        method,
        url,
    };

    if (method === 'GET' || method === 'PUT') {
        config.params = params;
    } else {
        config.data = data;
    }

    return apiClient(config);
};

export const get = async <T>(url: string, params?: unknown): Promise<T> => {
    const response = await request<T>({ method: 'GET', url, params });

    return response.data;
};

export const post = async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await request<T>({ method: 'POST', url, data });
    return response.data;
};

export const put = async <T>(url: string, params?: unknown): Promise<T> => {
    const response = await request<T>({ method: 'PUT', url, params });
    return response.data;
};

export const del = async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await request<T>({ method: 'DELETE', url, data });
    return response.data;
};

export const patch = async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await request<T>({ method: 'PATCH', url, data });
    return response.data;
};

export function getApiErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'isAxiosError' in error && (error as AxiosError).isAxiosError === true) {
        const apiError = (error as AxiosError<ApiError>).response?.data;
        return apiError?.messages?.[0] ?? 'An unknown error occurred.';
    }

    return 'Unexpected error occurred.';
}
