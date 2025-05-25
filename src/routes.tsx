import React from 'react';
import { RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import Dashboard from './views/Dashboard/Dashboard';
import DashboardOverview from './views/Dashboard/Content/DashboardOverview';
import { useAuth } from '@/context/AuthProvider';
import DefaultLayout from './layouts/DefaultLayout';
import AttractionsList from './components/Attractions/AttractionsList';
import DashboardAdminPanel from './views/Dashboard/Content/DashboardSettings/AdminPanel/DashboardAdminPanel';
import DashboardSettings from './views/Dashboard/Content/DashboardSettings/DashboardSettings';

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
            <ProtectedRoute>
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
