import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <DashboardSidebar />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
