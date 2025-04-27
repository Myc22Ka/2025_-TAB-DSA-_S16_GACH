// Login.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import '@/index.css';

export default function Login() {
    const handleLogin = () => {
        console.log('Logowanie się rozpoczęło');
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-sm p-6">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-bold text-center">Zaloguj się</h2>
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded-xl" />
                    <input type="password" placeholder="Hasło" className="w-full p-2 border rounded-xl" />
                    <Button onClick={handleLogin} className="w-full">
                        Zaloguj się
                    </Button>

                    <div className="text-center mt-4">
                        <p>Nie masz konta?</p>
                        <a href="register.html" className="text-blue-500 hover:text-blue-700">
                            Zarejestruj się
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
