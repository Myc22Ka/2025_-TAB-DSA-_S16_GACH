import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { get, post, getApiErrorMessage } from '@/lib/axios';
import { format } from 'date-fns';
import { AlertCircle } from 'lucide-react';
import { Ticket } from '@/interfaces/iTickets';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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

    const isTicketVisible = (ticket: Ticket) => {
        if (ticket.status !== 'EXPIRED') return true;

        const availabilityToTimestamp = new Date(ticket.availabilityTo).getTime();
        const expirationLimit = availabilityToTimestamp + 30 * 24 * 60 * 60 * 1000; // 30 dni w ms

        return Date.now() < expirationLimit;
    };

    const handleActivate = async (ticketId: number) => {
        try {
            await post(`/api/tickets/${ticketId}/activate`);
            toast.success('🎟️ Ticket successfully activated!');
            const updatedTickets = (await get('/api/tickets/me')) as Ticket[];
            setTickets(updatedTickets);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };
    const handleRefund = async (ticketId: number) => {
        try {
            await post(`/api/tickets/refund?ticketId=${ticketId}`);
            toast.success('🎟️ Sorry for inconvenience!');
            const updatedTickets = (await get('/api/tickets/me')) as Ticket[];
            setTickets(updatedTickets);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };
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
            {tickets.filter(isTicketVisible).map((ticket, idx) => (
                <Card key={idx} className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 text-sm">
                    {/* Godziny i atrakcja */}
                    <div className="flex justify-between items-center gap-1">
                        <div className="text-left">
                            <div className="text-xs text-muted-foreground">Date of purchase</div>
                            <div className="text-lg font-semibold">{format(new Date(ticket.purchaseTime), 'dd.MM.yyyy HH:mm')}</div>
                        </div>

                        <div className="text-center text-xl font-bold tracking-wide uppercase">{ticket.attractionName}</div>

                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Valid until</div>
                            <div className="text-lg font-semibold">{format(new Date(ticket.availabilityTo), 'dd.MM.yyyy HH:mm')}</div>
                        </div>
                    </div>

                    {/* Linie podziału */}
                    <div className="border-t border-dashed my-2" />

                    {/* Informacje dodatkowe */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-xs text-muted-foreground">Date of purchase</div>
                            <div className="font-medium">{format(new Date(ticket.purchaseTime), 'dd MMM yyyy')}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Valid for</div>
                            <div className="font-medium">{ticket.validDurationMinutes} min</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-muted-foreground">Used</div>
                            <div className="font-medium">{ticket.usedTime ? 'Yes' : 'No'}</div>
                        </div>
                    </div>

                    {/* Kolejna linia */}
                    <div className="border-t border-dashed my-2" />

                    {/* Status + Cena + Akcje */}
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-muted-foreground">Status</div>
                            <Badge variant={ticket.status === 'ACTIVE' ? 'success' : 'default'}>{ticket.status}</Badge>
                        </div>

                        <div className="text-center">
                            <div className="text-xs text-muted-foreground">Price</div>
                            <div className="text-xl font-bold text-purple-600">{ticket.price.toFixed(2)} zł</div>
                        </div>

                        <div className="flex flex-col gap-1">
                            {!ticket.usedTime && (
                                <Button size="sm" variant="success" onClick={() => handleActivate(ticket.id)}>
                                    Activate
                                </Button>
                            )}
                            {ticket.status !== 'ACTIVE' && ticket.status !== 'EXPIRED' && (
                                <Button size="sm" variant="destructive" onClick={() => handleRefund(ticket.id)}>
                                    Refund
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MyTickets;
