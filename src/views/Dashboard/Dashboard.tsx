// components/Dashboard.tsx
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import { useAuth } from '@/context/AuthProvider';

type DashboardProps = {
    selectedSection: string;
};

const Dashboard: React.FC<DashboardProps> = ({ selectedSection }) => {
    const [selectedSectionState, setSelectedSectionState] = useState<string>(selectedSection);
    const { user } = useAuth();

    const handleSectionChange = (section: string) => {
        setSelectedSectionState(section);
    };

    return (
        <div className="flex">
            <DashboardSidebar onSectionChange={handleSectionChange} />
            <DashboardContent user={user} selectedSection={selectedSectionState} />
        </div>
    );
};

export default Dashboard;
