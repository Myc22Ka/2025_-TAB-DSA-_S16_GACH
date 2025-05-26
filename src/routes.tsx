import React from 'react';
import { RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import Dashboard from './views/Dashboard/Dashboard';
import DefaultLayout from './layouts/DefaultLayout';
import AttractionsList from './components/Attractions/AttractionsList';
import DashboardAdminPanel from './views/Dashboard/Content/DashboardSettings/AdminPanel/DashboardAdminPanel';
import DashboardSettings from './views/Dashboard/Content/DashboardSettings/DashboardSettings';
import DashboardOverview from './views/Dashboard/Content/DashboardOverview';
import AttractionFull from './views/AtractionFull';
import AttractionSite from './components/Attractions/AttractionSite';
import PriceList from './components/Attractions/AttractionPrices';
import GiveTicket from './views/Dashboard/Content/DashboardSettings/Ticket/GiveTicket';

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
        path: '/attractions',

        element: (
            <DefaultLayout>
                <AttractionsList />
            </DefaultLayout>
        ),
    },
    {
        path: '/atraction',
        element: <AttractionFull />,
    },
    {
        path: '/attraction/:id',
        element: <AttractionSite />,
    },
    {
        path: '/prices',
        element: <PriceList />,
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
                element: <DashboardOverview />,
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
                path: 'sell-tickets',
                element: <GiveTicket />,
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
