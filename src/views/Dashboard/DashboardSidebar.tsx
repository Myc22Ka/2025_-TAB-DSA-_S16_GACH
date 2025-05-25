import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { User } from '@/interfaces/IUser';
import { User as UserIcon, Settings, Shield, DollarSign, Ticket } from 'lucide-react';

type DashboardSidebarProps = {
    user: User | null;
};

const allLinks = [
    { name: 'My Profile', to: '/dashboard', roles: ['USER', 'CASHIER', 'ADMIN'], icon: UserIcon },
    { name: 'Settings', to: '/dashboard/settings', roles: ['USER', 'CASHIER', 'ADMIN'], icon: Settings },
    { name: 'My tickets', to: '/dashboard/my-tickets', roles: ['USER', 'CASHIER', 'ADMIN'], icon: Ticket },
    { name: 'Admin Panel', to: '/dashboard/admin', roles: ['ADMIN'], icon: Shield },
    { name: 'Cash Register', to: '/dashboard/cash-register', roles: ['CASHIER'], icon: DollarSign },
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user }) => {
    const { pathname } = useLocation();
    const role = user?.role;
    const visibleLinks = allLinks.filter(link => link.roles.includes(role ?? ''));

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen p-6 shadow-sm">
            <nav className="space-y-1">
                {visibleLinks.map(link => {
                    const Icon = link.icon;
                    const isActive = pathname === link.to;

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={cn(
                                'group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200',
                                isActive
                                    ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary'
                            )}
                        >
                            <Icon className="w-5 h-5 shrink-0 transition-colors duration-200" />
                            <span className="text-sm tracking-wide">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
