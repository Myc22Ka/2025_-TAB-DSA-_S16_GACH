import React from 'react';
import { RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import DashboardContent from './views/Dashboard/DashboardContent';
import { Role } from '@/interfaces/IUser';

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
        path: '/dashboard',
        element: <ProtectedRoute requiredRoles={[USER, CASHIER, ADMIN, INSTRUCTOR]} />,
        children: [
            {
                path: '',
                element: <DashboardContent role={USER} selectedSection="overview" />,
            },
            {
                path: 'profile',
                element: <ProtectedRoute requiredRoles={[USER]} />,
                children: [{ path: '', element: <div>My Profile</div> }],
            },
            {
                path: 'orders',
                element: <ProtectedRoute requiredRoles={[USER]} />,
                children: [{ path: '', element: <div>Orders</div> }],
            },
            {
                path: 'transactions',
                element: <ProtectedRoute requiredRoles={[CASHIER, ADMIN]} />,
                children: [{ path: '', element: <div>Transactions</div> }],
            },
            {
                path: 'cash-register',
                element: <ProtectedRoute requiredRoles={[CASHIER]} />,
                children: [{ path: '', element: <div>Cash Register</div> }],
            },
            {
                path: 'admin',
                element: <ProtectedRoute requiredRoles={[ADMIN]} />,
                children: [
                    { path: 'users', element: <div>User Management</div> },
                    { path: 'logs', element: <div>System Logs</div> },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
];
