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

    if (user) {
        return (
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <Avatar>
                        <AvatarImage src={''} alt={user?.login} />
                        <AvatarFallback>{user?.login.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.login}</span>
                </div>
                <Button variant="outline" className="flex items-center space-x-2" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4 mr-1" />
                Log in
            </Button>
            <Button variant="default" onClick={() => navigate('/signup')}>
                <UserPlus className="h-4 w-4 mr-1" />
                Sign up
            </Button>
        </div>
    );
};

export default UserActions;
