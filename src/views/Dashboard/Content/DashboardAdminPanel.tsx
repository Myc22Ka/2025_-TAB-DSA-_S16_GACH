import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RoleChangeRequestDto } from '@/interfaces/IUser';
import { useAuth } from '@/context/AuthProvider';
import { API_URL } from '@/lib/axios';

export default function DashboardAdminPanel() {
    const { token } = useAuth();
    const [requests, setRequests] = useState<RoleChangeRequestDto[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/role-change-requests`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) throw new Error('Request failed');
                return res.json();
            })
            .then((data: RoleChangeRequestDto[]) => setRequests(data))
            .catch(error => console.error('Failed to load requests:', error));
    }, []);

    //DO NAPRAWY
    const updateRequestStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
        try {
            const response = await fetch(`${API_URL}/role-change-requests/${id}/status`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update status for request ${id}`);
            }

            setRequests(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Role Change Requests</h1>
            <ScrollArea className="h-[600px] rounded-md border p-4">
                <div className="space-y-4">
                    {requests.map(({ id, userLogin, requestedRole, status }) => (
                        <Card key={id} className="shadow-md">
                            <CardContent className="flex justify-between items-center p-4">
                                <div>
                                    <p className="font-semibold"> {userLogin}</p>
                                    <p className="text-sm text-muted-foreground">Requested Role: {requestedRole}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Badge
                                        className={status === 'APPROVED' ? 'bg-green-700 text-white' : ''}
                                        variant={status === 'APPROVED' ? 'secondary' : status === 'REJECTED' ? 'destructive' : 'outline'}
                                    >
                                        {status}
                                    </Badge>
                                    {status === 'PENDING' && (
                                        <>
                                            <Button
                                                className={'bg-green-700 text-white hover:bg-green-600'}
                                                onClick={() => updateRequestStatus(id, 'APPROVED')}
                                            >
                                                Accept
                                            </Button>
                                            <Button variant="destructive" onClick={() => updateRequestStatus(id, 'REJECTED')}>
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
