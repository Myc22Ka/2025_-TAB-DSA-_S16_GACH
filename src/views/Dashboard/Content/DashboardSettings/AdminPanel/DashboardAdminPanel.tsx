import React, { useEffect, useState } from 'react';
import { get, getApiErrorMessage, patch } from '@/lib/axios';
import { IRoleChangeRequest } from '@/interfaces/IRoleRequests';
import { toast } from 'sonner';

import RoleChangeFilter from './RoleChangeFilter';
import RoleChangeCard from './RoleChangeCard';

type StatusType = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

export default function DashboardAdminPanel() {
    const [requests, setRequests] = useState<IRoleChangeRequest[]>([]);
    const [filterStatus, setFilterStatus] = useState<StatusType>('ALL');

    const getAllRoleRequests = async () => {
        try {
            const response = await get<IRoleChangeRequest[]>('/api/role-change-requests');
            setRequests(response);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    useEffect(() => {
        getAllRoleRequests();
    }, []);

    const updateRequestStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
        try {
            await patch(`/api/role-change-requests/${id}/status?newStatus=${status}`);
            toast.success(`Request ${status.toLowerCase()} successfully.`);
            getAllRoleRequests();
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const filteredRequests = filterStatus === 'ALL' ? requests : requests.filter(r => r.status === filterStatus);

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Role Change Requests</h1>
                <RoleChangeFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            </div>

            <div className="space-y-5">
                {filteredRequests.length === 0 ? (
                    <div className="rounded-md border border-border bg-muted p-6 text-center text-muted-foreground shadow-sm">
                        No role change requests found.
                    </div>
                ) : (
                    filteredRequests.map(request => <RoleChangeCard key={request.id} request={request} updateRequestStatus={updateRequestStatus} />)
                )}
            </div>
        </div>
    );
}
