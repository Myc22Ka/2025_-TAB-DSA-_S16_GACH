// components/Dashboard/DashboardSidebar.tsx
import React from 'react';

type DashboardSidebarProps = {
    onSectionChange: (section: string) => void; // Funkcja przekazywania sekcji
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onSectionChange }) => {
    return (
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 min-h-screen p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Dashboard</h2>
            <nav className="space-y-2">
                <a
                    href="#"
                    onClick={() => onSectionChange('overview')}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                    Overview
                </a>
                <a
                    href="#"
                    onClick={() => onSectionChange('profile')}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                    My Profile
                </a>
                <a
                    href="#"
                    onClick={() => onSectionChange('orders')}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                    Orders
                </a>
                <a
                    href="#"
                    onClick={() => onSectionChange('transactions')}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                    Transactions
                </a>
                <a
                    href="#"
                    onClick={() => onSectionChange('cash-register')}
                    className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                    Cash Register
                </a>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;
