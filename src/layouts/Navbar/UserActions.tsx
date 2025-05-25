import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';

const UserActions: React.FC = () => {
    const { user, logout, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return <div></div>;
    }

    return user ? (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition" onClick={() => navigate('/dashboard')}>
                <Avatar>
                    <AvatarImage src={''} alt={user?.login} />
                    <AvatarFallback>{user?.login.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{user?.login}</span>
            </div>
            <Button variant="ghost" className="flex items-center space-x-1 text-sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span>Wyloguj</span>
            </Button>
        </div>
    ) : (
        <div className="flex items-center space-x-2">
            <Button variant="ghost" className="text-sm flex items-center space-x-1" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4" />
                <span>Zaloguj</span>
            </Button>
            <Button variant="default" className="text-sm flex items-center space-x-1" onClick={() => navigate('/signup')}>
                <UserPlus className="h-4 w-4" />
                <span>Rejestracja</span>
            </Button>
        </div>
    );
};

export default UserActions;
