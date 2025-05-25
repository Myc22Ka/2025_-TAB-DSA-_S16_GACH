import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '@/context/AuthProvider';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    console.log('Dashboard user:', user);

    return (
        <div className="flex">
            <DashboardSidebar user={user} />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
