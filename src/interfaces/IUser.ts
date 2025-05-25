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
    gender: 'F' | 'M' | null;
}

export const roles = ['USER', 'ADMIN', 'INSTRUCTOR', 'CASHIER'] as const;
export type Role = (typeof roles)[number];

export interface AuthenticationResponse {
    access_token: string;
    refresh_token: string;
}
