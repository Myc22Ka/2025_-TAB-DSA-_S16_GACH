import { RequestConfig } from '@/interfaces/IAxios';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create Axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: `http://localhost:8080`,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        indexes: null,
    },
});

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
    const response = await request<T>({ method: 'PUT', url, data });
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
