import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { User } from '@/interfaces/IUser'; // Zakładam, że masz taki interfejs

type DashboardSidebarProps = {
    user: User | null;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
    const { pathname } = useLocation();

    const role = user?.role;

    // Wszystkie możliwe linki
    const allLinks = [
        { name: 'My Profile', to: '/dashboard', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Settings', to: '/dashboard/settings', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Orders', to: '/dashboard/orders', roles: ['USER', 'CASHIER', 'ADMIN'] },
        { name: 'Transactions', to: '/dashboard/transactions', roles: ['ADMIN'] },
        { name: 'Cash Register', to: '/dashboard/cash-register', roles: ['CASHIER'] },
    ];

    const visibleLinks = allLinks.filter(link => link.roles.includes(role ?? ''));

    return (
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 min-h-screen p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Dashboard</h2>
            <nav className="space-y-2">
                {visibleLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={clsx(
                            'block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700',
                            pathname === link.to ? 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
