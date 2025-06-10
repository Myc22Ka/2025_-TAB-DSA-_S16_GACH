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

type TimerMap = Record<number, string>;

const MyTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [error] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<TimerMap>({});

    const formatDuration = (ms: number) => {
        if (ms <= 0) return '00:00';
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!tickets) return;

        const interval = setInterval(() => {
            const now = Date.now();

            const updatedTimeLeft: TimerMap = {};

            tickets.forEach(ticket => {
                if (ticket.status === 'ACTIVE' && ticket.usedTime) {
                    const endTime = new Date(ticket.usedTime).getTime() + ticket.validDurationMinutes * 60 * 1000;
                    const diff = endTime - now;
                    updatedTimeLeft[ticket.id] = formatDuration(diff);
                }
            });

            setTimeLeft(updatedTimeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [tickets]);

    const fetchTickets = async () => {
        try {
            const tickets = (await get('/api/tickets/me')) as Ticket[];
            setTickets(tickets);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const isTicketVisible = (ticket: Ticket) => {
        if (ticket.status !== 'EXPIRED') return true;

        const availabilityToTimestamp = new Date(ticket.availabilityTo).getTime();
        const expirationLimit = availabilityToTimestamp + 30 * 24 * 60 * 60 * 1000; // 30 dni w ms

        return Date.now() < expirationLimit;
    };

    const sortTickets = (tickets: Ticket[]) => {
        const order: Record<string, number> = {
            ACTIVE: 1,
            INACTIVE: 2,
            EXPIRED: 3,
            REFUNDED: 4,
        };

        return [...tickets].sort((a, b) => {
            const orderA = order[a.status] ?? 99;
            const orderB = order[b.status] ?? 99;
            return orderA - orderB;
        });
    };

    const handleActivate = async (ticketId: number) => {
        try {
            await post(`/api/tickets/${ticketId}/activate`);
            toast.success('🎟️ Ticket successfully activated!');
            fetchTickets();
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const handleRefund = async (ticketId: number) => {
        try {
            await post(`/api/tickets/refund?ticketId=${ticketId}`);
            toast.success('🎟️ Sorry for inconvenience!');
            fetchTickets();
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
            <Alert variant="default" className="max-w-lg mx-auto mt-10">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <AlertTitle>No tickets found</AlertTitle>
                <AlertDescription>{error || 'You don’t have any tickets yet. Go explore and book something!'}</AlertDescription>
            </Alert>
        );
    }

    const visibleSortedTickets = sortTickets(tickets.filter(isTicketVisible).filter(ticket => ticket.status !== 'REFUNDED'));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleSortedTickets.map(ticket => (
                <Card
                    key={ticket.id}
                    className={`flex flex-col p-4 rounded-2xl border-2 shadow-md
            ${ticket.status === 'ACTIVE' ? 'border-green-500' : 'border-gray-300'}
          `}
                >
                    {/* Obrazek i nazwa */}
                    <div className="flex items-center gap-4">
                        <img src={ticket.attractionDetails.imageUrl} alt={ticket.attractionName} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{ticket.attractionName}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{ticket.attractionDetails.description}</p>
                        </div>
                    </div>

                    {/* Daty i status */}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <div className="uppercase text-xs text-gray-400">Date of Purchase</div>
                            <div>{format(new Date(ticket.purchaseTime), 'dd MMM yyyy HH:mm')}</div>
                        </div>
                        <div>
                            <div className="uppercase text-xs text-gray-400">Valid Until</div>
                            <div>{format(new Date(ticket.availabilityTo), 'dd MMM yyyy HH:mm')}</div>
                        </div>
                        <div>
                            <div className="uppercase text-xs text-gray-400">Duration</div>
                            <div>{ticket.validDurationMinutes} min</div>
                        </div>
                        <div>
                            <div className="uppercase text-xs text-gray-400">Used</div>
                            <div>{ticket.usedTime ? 'Yes' : 'No'}</div>
                        </div>
                        <div>
                            <div className="uppercase text-xs text-gray-400">Price</div>
                            <div>{ticket.price.toFixed(2)} zł</div>
                        </div>
                        {ticket.status === 'ACTIVE' && ticket.usedTime && (
                            <div>
                                <div className="uppercase text-xs text-gray-400">Time left</div>
                                <div className="text-sm font-mono text-primary">
                                    <span className="font-bold">{timeLeft[ticket.id] || 'Loading...'}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status i cena + akcje */}
                    <div className="mt-6 flex justify-between items-center">
                        <Badge
                            variant={
                                ticket.status === 'ACTIVE'
                                    ? 'success'
                                    : ticket.status === 'INACTIVE'
                                      ? 'secondary'
                                      : ticket.status === 'EXPIRED'
                                        ? 'destructive'
                                        : 'default'
                            }
                            className="uppercase font-semibold tracking-wide"
                        >
                            {ticket.status}
                        </Badge>

                        <div className="flex gap-2">
                            {!ticket.usedTime && ticket.status === 'INACTIVE' && (
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
