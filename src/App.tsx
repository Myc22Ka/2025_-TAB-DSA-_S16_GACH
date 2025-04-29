import React from 'react';
import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { Toaster } from 'sonner';

export const router = createBrowserRouter(routes);

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
};

export default App;
