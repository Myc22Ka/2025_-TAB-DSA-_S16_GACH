export interface User {
    login: string;
    email: string;
    role: Role;
}

export type Role = 'USER' | 'ADMIN' | 'INSTRUCTOR' | 'CASHIER';

export interface AuthenticationResponse {
    access_token: string;
    refresh_token: string;
}
