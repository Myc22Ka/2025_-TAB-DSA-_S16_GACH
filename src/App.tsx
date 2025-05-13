import React from 'react';
import { routerConfig, routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthProvider';
import { persister, queryClient } from './lib/query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const router = createBrowserRouter(routes, routerConfig);

const App: React.FC = () => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <AuthProvider>
                    <Toaster />
                    <RouterProvider router={router} future={{ v7_startTransition: true }} />
                </AuthProvider>
            </ThemeProvider>
            {import.meta.env.VITE_SPRING_PROFILES_ACTIVE === 'dev' && <ReactQueryDevtools initialIsOpen />}
        </PersistQueryClientProvider>
    );
};

export default App;
