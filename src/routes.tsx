import React from 'react';
import { RouteObject } from 'react-router';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
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
        path: '*',
        element: <ErrorPage />,
    },
];
