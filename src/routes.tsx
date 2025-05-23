import React from 'react';
import { RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import Dashboard from './views/Dashboard/Dashboard';
import { Role } from '@/interfaces/IUser';
import DashboardOverview from './views/Dashboard/Content/DashboardOverview';
import { useAuth } from '@/context/AuthProvider';
import DefaultLayout from './layouts/DefaultLayout';
import AttractionsList from './components/Attractions/AttractionsList';
import DashboardSettings from './views/Dashboard/Content/DashboardSettings';
import DashboardAdminPanel from './views/Dashboard/Content/DashboardAdminPanel';

const DashboardProfileWrapper = () => {
    const { user } = useAuth();

    if (!user) return null;

    return <DashboardOverview user={user} />;
};
export const routerConfig = {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
};

const USER: Role = 'USER';
const CASHIER: Role = 'CASHIER';
const ADMIN: Role = 'ADMIN';
const INSTRUCTOR: Role = 'INSTRUCTOR';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/atrakcje',
        element: <AttractionsList />,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute requiredRoles={[USER, CASHIER, ADMIN, INSTRUCTOR]}>
                <DefaultLayout>
                    <Dashboard />
                </DefaultLayout>
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <DashboardProfileWrapper />,
            },
            {
                path: 'settings',
                element: <DashboardSettings />,
            },
            {
                path: 'orders',
                element: <div>Orders</div>,
            },
            {
                path: 'transactions',
                element: <div>Transactions</div>,
            },
            {
                path: 'cash-register',
                element: <div>Cash Register</div>,
            },
            {
                path: 'admin',
                element: <DashboardAdminPanel />,
            },
            {
                path: 'admin/logs',
                element: <div>System Logs</div>,
            },
        ],
    },

    {
        path: '*',
        element: <ErrorPage />,
    },
];
