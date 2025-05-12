// components/DashboardContent.tsx
import React from 'react';
import { User } from '@/interfaces/IUser';
import DashboardOverview from './Content/DashboardOverview';

type DashboardContentProps = {
    user: User | null;
    selectedSection: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ user, selectedSection }) => {
    const renderContent = () => {
        switch (selectedSection) {
            case 'overview':
                return <p className="text-lg">Cześć {user?.login}! To jest sekcja przeglądowa Twojego panelu.</p>;
            case 'profile':
                return <DashboardOverview user={user} />;
            case 'orders':
                return <p>Here are your orders.</p>;
            case 'transactions':
                return <p>Manage your transactions here.</p>;
            case 'cash-register':
                return <p>Access the cash register here.</p>;
            default:
                return <p>Welcome, {user?.role}. Please select a section from the sidebar.</p>;
        }
    };

    return (
        <div className="flex-1 p-6 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {renderContent()}
        </div>
    );
};

export default DashboardContent;
