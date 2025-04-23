// src/User/Register.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import '@/index.css';

export default function Register() {
    const handleRegister = () => {
        console.log('Rejestracja rozpoczęta');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-sm p-6">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-bold text-center">Zarejestruj się</h2>

                    <input type="text" placeholder="Login" className="w-full p-2 border rounded-xl" />
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded-xl" />
                    <input type="password" placeholder="Hasło" className="w-full p-2 border rounded-xl" />

                    <Button onClick={handleRegister} className="w-full">
                        Zarejestruj się
                    </Button>

                    <div className="text-center mt-4">
                        <a href="login.html" className="text-blue-500 hover:text-blue-700">
                            Masz już konto? Zaloguj się
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
