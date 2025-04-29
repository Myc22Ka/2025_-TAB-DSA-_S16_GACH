import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm ">
            <div className="container mx-auto px-4 py-3 flex items-center justify-start space-x-6">
                <NavigationMenu>
                    <NavigationMenuItem>
                        <Link to="/atrakcje">
                            <NavigationMenuLink className="text-gray-800 dark:text-white">Atrakcje</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/cennik">
                            <NavigationMenuLink className="text-gray-800 dark:text-white">Cennik</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenu>
            </div>
        </header>
    );
};

export default Navbar;
