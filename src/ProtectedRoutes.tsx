import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    const token = localStorage.getItem('token');

    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
