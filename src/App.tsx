import React from 'react';
import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter(routes);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
