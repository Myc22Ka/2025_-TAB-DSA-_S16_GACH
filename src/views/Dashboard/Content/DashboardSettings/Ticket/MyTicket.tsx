import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { get, getApiErrorMessage } from '@/lib/axios';
import { format } from 'date-fns';
import { AlertCircle } from 'lucide-react';
import { Ticket } from '@/interfaces/iTickets';
import { toast } from 'sonner';

const MyTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [error] = useState<string | null>(null);
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = (await get('/api/tickets/me')) as Ticket[];
                setTickets(tickets);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            }
        };

        fetchTickets();
    }, []);

    if (tickets === null) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-60 rounded-xl" />
                ))}
            </div>
        );
    }

    if (tickets.length === 0 || error) {
        return (
            <Alert variant="default">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <AlertTitle>No tickets found</AlertTitle>
                <AlertDescription>{error || 'You don’t have any tickets yet. Go explore and book something!'}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, idx) => (
                <Card key={idx} className="rounded-2xl shadow-md overflow-hidden">
                    <img src={ticket.attractionDetails.imageUrl} alt={ticket.attractionName} className="w-full h-40 object-cover" />
                    <CardHeader>
                        <CardTitle className="text-xl">{ticket.attractionName}</CardTitle>
                        <CardDescription>{ticket.attractionDetails.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                            <span className="font-medium min-w-[100px]">Status:</span>
                            <Badge variant={ticket.usedTime ? 'success' : 'default'}>{ticket.status}</Badge>
                        </div>

                        {[
                            ['Purchased', format(new Date(ticket.purchaseTime), 'dd.MM.yyyy HH:mm')],
                            ['Valid until', format(new Date(ticket.availabilityTo), 'dd.MM.yyyy HH:mm')],
                            ['Used', ticket.usedTime ? format(new Date(ticket.usedTime), 'dd.MM.yyyy HH:mm') : 'Not used'],
                            ['Price', `${ticket.price.toFixed(2)} zł`],
                            ['Valid for', `${ticket.validDurationMinutes} min`],
                            ['People', `${ticket.attractionDetails.currentPeopleAmount} / ${ticket.attractionDetails.maxPeopleAmount}`],
                        ].map(([label, value]) => (
                            <div key={label.toString()} className="flex items-start gap-2">
                                <span className="font-medium min-w-[100px]">{label}:</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default MyTickets;
