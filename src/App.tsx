import React from 'react';
import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthProvider';

export const router = createBrowserRouter(routes);

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Toaster />
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
