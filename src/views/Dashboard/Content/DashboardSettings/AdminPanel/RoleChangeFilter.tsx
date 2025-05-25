import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statuses = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;

interface RoleChangeFilterProps {
    filterStatus: (typeof statuses)[number];
    setFilterStatus: (status: (typeof statuses)[number]) => void;
}

export default function RoleChangeFilter({ filterStatus, setFilterStatus }: RoleChangeFilterProps) {
    return (
        <div className="mb-6 flex items-center space-x-4">
            <label htmlFor="statusFilter" className="font-medium text-gray-700 dark:text-gray-300">
                Filter by Status:
            </label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]" id="statusFilter">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
