import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';
import Logo from './Logo';
import Navigation from './Navigation';
import { useAuth } from '@/context/AuthProvider';

const Navbar: React.FC = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                <Logo />
                <Navigation />

                {/* Użytkownik / Logowanie */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={''} alt={user?.login} />
                                <AvatarFallback>{user?.login.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{user?.login}</span>
                        </div>
                    ) : (
                        <Button variant="outline" className="flex items-center space-x-2">
                            <LogIn className="h-4 w-4" />
                            <span>Zaloguj się</span>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
