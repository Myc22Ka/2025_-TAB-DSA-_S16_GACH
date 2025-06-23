import React, { useEffect, useState } from 'react';
import { get, getApiErrorMessage } from '@/lib/axios';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CalendarDays } from 'lucide-react';
import { Appointment, dayOrder } from '@/interfaces/IAppointment';

export default function MyClasses() {
    const [classes, setClasses] = useState<Appointment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchClasses = async () => {
        try {
            const appointments = (await get('/api/users/me/appointments')) as Appointment[];
            const sorted = appointments.sort((a, b) => (dayOrder[a.dayOfWeek] || 99) - (dayOrder[b.dayOfWeek] || 99));
            setClasses(sorted);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="space-y-6">
            {/* Tytuł i opis */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">My classes</h1>
                <p className="text-muted-foreground">
                    Here you will find a list of classes you are currently registered for. See when and with whom you have upcoming meetings.
                </p>
            </div>

            {/* Treść główna */}
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
            ) : !classes || classes.length === 0 ? (
                <Alert>
                    <CalendarDays className="h-4 w-4" />
                    <AlertTitle>Brak zajęć</AlertTitle>
                    <AlertDescription>Nie jesteś zapisany na żadne zajęcia.</AlertDescription>
                </Alert>
            ) : (
                <div className="grid gap-4">
                    {classes.map((cls, index) => (
                        <Card key={index} className="rounded-2xl shadow-md">
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold">{cls.instructorName}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {cls.dayOfWeek}, {cls.startTime} - {cls.endTime}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
