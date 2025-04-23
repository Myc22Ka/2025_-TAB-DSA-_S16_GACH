// LoginMain.tsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from '@/User/Login.tsx';

createRoot(document.getElementById('login')!).render(
    <StrictMode>
        <Login />
    </StrictMode>
);
