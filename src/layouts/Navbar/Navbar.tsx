import React from 'react';

import Logo from './Logo';
import Navigation from './Navigation';
import UserActions from './UserActions';

const Navbar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 dark:border-gray-700 py-6">
            <div className="container mx-auto px-1 py-6 flex items-center justify-between border-y border-gray-300">
                <Logo />
                <Navigation />

                <UserActions />
            </div>
        </header>
    );
};

export default Navbar;
