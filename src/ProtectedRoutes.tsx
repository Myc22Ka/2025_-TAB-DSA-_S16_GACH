import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

type ProtectedRouteProps = {
    requiredRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!requiredRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
export default ProtectedRoute;
