import React from 'react';
import { Outlet, RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './views/ErrorPage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './views/HomePage/Home';
import Dashboard from './views/Dashboard/Dashboard';
import DefaultLayout from './layouts/DefaultLayout';
import DashboardAdminPanel from './views/Dashboard/Content/DashboardSettings/AdminPanel/DashboardAdminPanel';
import DashboardSettings from './views/Dashboard/Content/DashboardSettings/DashboardSettings';
import DashboardOverview from './views/Dashboard/Content/DashboardOverview';
import AttractionFull from './views/AtractionFull';
import AttractionSite from './views/AttractionSite/AttractionSite';
import PriceList from './components/Attractions/AttractionPrices';
import GiveTicket from './views/Dashboard/Content/DashboardSettings/Ticket/GiveTicket';
import MyTickets from './views/Dashboard/Content/DashboardSettings/Ticket/MyTicket';
import ContactPage from './views/ContactPage/Contact';
import InstructorsList from './components/Instructors/InstructorList';
import InstructorDetail from './components/Instructors/InstructorDetail ';
import Attractions from './components/Attractions/Attractions';
import MyClasses from './views/Dashboard/Content/DashboardSettings/MyClasses/MyClasses';
import InstructorAvailabilityCard from './components/Instructors/InstructorAvailabilityCard';

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
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/instructors',
        element: (
            <ProtectedRoute>
                <Outlet />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <InstructorsList /> },
            {
                path: ':id',
                element: (
                    <DefaultLayout>
                        <InstructorDetail />
                    </DefaultLayout>
                ),
            },
        ],
    },

    {
        path: '/attractions',

        element: <Attractions />,
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
                path: 'availability',
                element: <InstructorAvailabilityCard />,
            },
            {
                path: 'sell-tickets',
                element: <GiveTicket />,
            },
            {
                path: 'my-tickets',
                element: <MyTickets />,
            },
            {
                path: 'my-classes',
                element: <MyClasses />,
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
