// components/Dashboard.tsx
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Role } from '@/interfaces/IUser';
import DashboardContent from './DashboardContent'; // Zaimportowanie komponentu DashboardContent

const Dashboard: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('overview');

    const handleSectionChange = (section: string) => {
        setSelectedSection(section);
    };

    const role: Role = 'USER';

    return (
        <div className="flex">
            <DashboardSidebar onSectionChange={handleSectionChange} />
            <DashboardContent role={role} selectedSection={selectedSection} />
        </div>
    );
};

export default Dashboard;
