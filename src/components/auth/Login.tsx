import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Login() {
    const handleLogin = () => {
        console.log('Logowanie się rozpoczęło');
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Zaloguj się</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-xl dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        className="w-full p-2 border rounded-xl dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />

                    <Button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white rounded-xl hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        Zaloguj się
                    </Button>

                    <div className="text-center mt-4">
                        <Link
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            to="/signup"
                        >
                            Masz już konto? Zarejestruj się
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
