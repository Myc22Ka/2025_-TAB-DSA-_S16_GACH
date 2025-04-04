import { Method } from 'axios';

/* eslint-disable no-magic-numbers */
export enum ServerResponseCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

// Types for request configuration
export interface RequestConfig {
    method: Method;
    url: string;
    data?: unknown;
    params?: unknown;
}

// Generic response type for typed API responses
export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}
