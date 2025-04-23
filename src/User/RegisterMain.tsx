// src/RegisterMain.tsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Register from '@/User/Register';

createRoot(document.getElementById('register')!).render(
    <StrictMode>
        <Register />
    </StrictMode>
);
