import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IRoleChangeRequest } from '@/interfaces/IRoleRequests';

interface RoleChangeCardProps {
    request: IRoleChangeRequest;
    updateRequestStatus: (id: number, status: 'APPROVED' | 'REJECTED') => void;
}

export default function RoleChangeCard({ request, updateRequestStatus }: RoleChangeCardProps) {
    const { id, userLogin, requestedRole, status, currentRole } = request;

    return (
        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
            <CardContent className="flex flex-col sm:flex-row justify-between items-center p-5 gap-4 sm:gap-0">
                <div className="flex flex-col sm:flex-1 space-y-2">
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">{userLogin}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Change role:</span>
                        <Badge variant="secondary" className="capitalize">
                            {currentRole}
                        </Badge>
                        <span className="text-gray-400 dark:text-gray-500 font-bold">➔</span>
                        <Badge variant="success" className="capitalize">
                            {requestedRole}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Badge variant={status === 'APPROVED' ? 'success' : status === 'REJECTED' ? 'default' : 'outline'} className="uppercase tracking-wide">
                        {status}
                    </Badge>
                    {status === 'PENDING' && (
                        <>
                            <Button variant="success" onClick={() => updateRequestStatus(id, 'APPROVED')}>
                                Accept
                            </Button>
                            <Button variant="default" onClick={() => updateRequestStatus(id, 'REJECTED')}>
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
