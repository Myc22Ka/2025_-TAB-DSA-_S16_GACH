import React from 'react';
import { routerConfig, routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthProvider';

export const router = createBrowserRouter(routes, routerConfig);

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Toaster />
                <RouterProvider router={router} future={{ v7_startTransition: true }} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
