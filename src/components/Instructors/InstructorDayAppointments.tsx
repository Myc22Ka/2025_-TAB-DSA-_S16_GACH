import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { get, getApiErrorMessage, del } from '@/lib/axios';
import { toast } from 'sonner';
import { Appointment, daysOfWeek } from '@/interfaces/IAppointment';

const DayAppointments: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async (day: string) => {
        setSelectedDay(day);
        setLoading(true);

        try {
            const data = (await get(`/api/appointments/users?day=${day}`)) as Appointment[];
            setAppointments(data);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleKick = async (appointmentId: number, userEmail: string) => {
        try {
            await del(`/api/appointments/${appointmentId}/kick?userEmail=${encodeURIComponent(userEmail)}`);
            toast.success(`User ${userEmail} was removed from appointment.`);
            if (selectedDay) {
                fetchAppointments(selectedDay);
            }
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const grouped = appointments.reduce<Record<string, Appointment[]>>((acc, appt) => {
        const key = appt.startTime;
        if (!acc[key]) acc[key] = [];
        acc[key].push(appt);
        return acc;
    }, {});

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Appointments by Day</h2>

            <div className="flex flex-wrap gap-2">
                {daysOfWeek.map(day => (
                    <Button
                        key={day.value}
                        variant={selectedDay === day.value ? 'default' : 'outline'}
                        onClick={() => fetchAppointments(day.value)}
                        disabled={loading && selectedDay === day.value}
                    >
                        {day.label}
                    </Button>
                ))}
            </div>

            {selectedDay && (
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <h3 className="text-xl font-semibold">{daysOfWeek.find(d => d.value === selectedDay)?.label} Appointments</h3>

                        {appointments.length === 0 ? (
                            <p className="text-muted-foreground">No appointments found.</p>
                        ) : (
                            Object.entries(grouped).map(([time, list]) => (
                                <div key={time} className="space-y-2">
                                    <div className="text-sm font-semibold text-primary">{time}</div>
                                    <ul className="space-y-2">
                                        {list.map(appt => (
                                            <li key={appt.appointmentId} className="flex items-center justify-between bg-muted px-4 py-2 rounded-lg shadow-sm">
                                                <div className="text-sm font-medium">
                                                    {appt.user.firstname} {appt.user.lastname}
                                                </div>
                                                <Button size="sm" variant="destructive" onClick={() => handleKick(appt.appointmentId, appt.user.email)}>
                                                    Kick
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                    <Separator className="my-4" />
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DayAppointments;
