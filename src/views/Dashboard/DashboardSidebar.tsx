import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { User } from '@/interfaces/IUser';

type DashboardSidebarProps = {
    user: User | null;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
    const { pathname } = useLocation();
    const role = user?.role;

    const allLinks = [
        { name: 'My Profile', to: '/dashboard', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Settings', to: '/dashboard/settings', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Orders', to: '/dashboard/orders', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Admin Panel', to: '/dashboard/admin', roles: ['ADMIN'] },
        { name: 'Cash Register', to: '/dashboard/cash-register', roles: ['CASHIER'] },
    ];

    const visibleLinks = allLinks.filter(link => link.roles.includes(role ?? ''));

    return (
        <TooltipProvider>
            <aside className="w-64  dark:bg-gray-800 border-r dark:border-gray-700 min-h-screen p-4">
                <nav className="space-y-2">
                    {visibleLinks.map(link => (
                        <Tooltip key={link.to}>
                            <TooltipTrigger asChild>
                                <Link
                                    to={link.to}
                                    className={cn(
                                        'block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
                                        pathname === link.to
                                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                                            : 'text-gray-700 dark:text-gray-300'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="center">
                                {link.name}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
            </aside>
        </TooltipProvider>
    );
};

export default DashboardSidebar;
