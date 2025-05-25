import React from 'react';

import Logo from './Logo';
import Navigation from './Navigation';
import UserActions from './UserActions';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';

const Navbar: React.FC = () => {
    return (
        <header className="w-full z-50 bg-white dark:bg-gray-900 dark:border-gray-700 py-6 border-b">
            <div className="container mx-auto px-1 py-6 flex items-center justify-between border-y border-gray-300">
                <div className="flex items-center space-x-8">
                    <Logo />
                    <Navigation />
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <UserActions />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
