import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import useLogin from '@/hooks/useLogin';
import { toast } from 'sonner';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const result = await login({ email, password });
        if (result) {
            console.log('Zalogowano pomyślnie');
            navigate('/dashboard');
        }
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Zaloguj się</h2>

                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full" />
                    <Input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} className="w-full" />

                    <Button onClick={handleLogin} disabled={loading} className="w-full text-white" variant="default">
                        {loading ? 'Logowanie...' : 'Zaloguj się'}
                    </Button>

                    <div className="text-center mt-4">
                        <Link className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" to="/signup">
                            Nie masz konta? Zarejestruj się
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
