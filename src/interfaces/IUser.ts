export interface User {
    login: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
    role: Role;
    photoUrl: string | null;
    cash: number;
    phoneNumber: string | null;
    address: string | null;
    dateOfBirth: string | null;
    gender: string | null;
}

export type Role = 'USER' | 'ADMIN' | 'INSTRUCTOR' | 'CASHIER';

export interface AuthenticationResponse {
    access_token: string;
    refresh_token: string;
}
