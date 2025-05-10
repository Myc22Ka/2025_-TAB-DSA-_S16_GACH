// components/DashboardContent.tsx
import React from 'react';
import { Role } from '@/interfaces/IUser';

type DashboardContentProps = {
    role: Role;
    selectedSection: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ role, selectedSection }) => {
    const renderContent = () => {
        switch (selectedSection) {
            case 'overview':
                return <p>Welcome to your dashboard, {role}. This is the overview section.</p>;
            case 'profile':
                return <p>Your profile information goes here.</p>;
            case 'orders':
                return <p>Here are your orders.</p>;
            case 'transactions':
                return <p>Manage your transactions here.</p>;
            case 'cash-register':
                return <p>Access the cash register here.</p>;
            default:
                return <p>Welcome, {role}. Please select a section from the sidebar.</p>;
        }
    };

    return (
        <div className="flex-1 p-6 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Welcome, {role}</h1>
            {renderContent()}
        </div>
    );
};

export default DashboardContent;
