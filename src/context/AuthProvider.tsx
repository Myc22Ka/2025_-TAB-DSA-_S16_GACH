import React, { useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import { User } from '@/interfaces/IUser';
import { toast } from 'sonner';
import { authenticate } from '@/components/auth/utils/service';

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderState = {
    user: User | null;
    isLoggedIn: boolean;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const hasAuthenticatedRef = useRef(false);

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isLoggedIn = Boolean(user && token);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');

        toast.info('You have successfully logged out.');
    };

    useEffect(() => {
        if (hasAuthenticatedRef.current) return;

        if (!user && token) {
            setIsLoading(true);
            authenticate()
                .then(userData => {
                    setUser(userData);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });

            hasAuthenticatedRef.current = true;
        } else {
            setIsLoading(false);
        }
    }, [user, token]);

    return (
        <AuthProviderContext.Provider
            value={{
                user,
                isLoggedIn,
                setUser,
                token,
                setToken,
                logout,
                isLoading,
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
