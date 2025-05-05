import React from 'react';
import { RouteObject } from 'react-router';

import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import Dashboard from './views/Dashboard/Dashboard';

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
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
];
