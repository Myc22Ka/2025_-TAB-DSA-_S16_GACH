export interface User {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    email: string;
    cash: number;
    createdAt: string;
    phoneNumber: number | null;
    address: string | null;
    dateOfBirth: string | null;
    gender: string | null;
}
