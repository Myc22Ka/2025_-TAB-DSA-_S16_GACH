import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { User } from '@/interfaces/IUser';
import { toast } from 'sonner';
import { authenticate } from '@/components/auth/utils/service';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderState = {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');

        toast.info('You have successfully logged out.');
    };

    useEffect(() => {
        if (!user && token) {
            authenticate()
                .then(userData => {
                    setUser(userData);
                })
                .catch(() => {
                    toast.error('Failed to authenticate user');
                });

            return;
        }
    }, [user, token]);

    return (
        <AuthProviderContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                logout,
            }}
        >
            {children}
        </AuthProviderContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
