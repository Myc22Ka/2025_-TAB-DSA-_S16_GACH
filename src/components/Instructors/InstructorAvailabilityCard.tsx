'use client';

import React, { useState } from 'react';
import { post, getApiErrorMessage } from '@/lib/axios';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { daysOfWeek, InstructorWithAvailability } from '@/interfaces/IInstructor';
import { useAuth } from '@/context/AuthProvider';

type AvailabilityForm = {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
};

export default function InstructorAvailabilityCard() {
    const { user } = useAuth();

    const [availabilityData] = useState<InstructorWithAvailability | null>(null);

    const [form, setForm] = useState<AvailabilityForm>({
        dayOfWeek: 'MONDAY',
        startTime: '',
        endTime: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof AvailabilityForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.startTime || !form.endTime || !user?.id) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (form.endTime <= form.startTime) {
            toast.error('End time must be after start time.');
            return;
        }

        setLoading(true);
        try {
            await post('/api/appointments/book', {
                instructorId: user.id,
                dayOfWeek: form.dayOfWeek,
                startTime: form.startTime,
                endTime: form.endTime,
            });

            toast.success('Availability saved successfully.');
            setForm({ dayOfWeek: 'MONDAY', startTime: '', endTime: '' });
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-xl mx-auto rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Instructor Availability</h2>

                {/* Instructor info */}
                {availabilityData && (
                    <p className="text-sm text-muted-foreground">
                        {availabilityData.instructor.firstname} {availabilityData.instructor.lastname} ({availabilityData.instructor.login})
                    </p>
                )}

                {/* Form */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Day of the Week</Label>
                        <Select value={form.dayOfWeek} onValueChange={v => handleChange('dayOfWeek', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent>
                                {daysOfWeek.map(day => (
                                    <SelectItem key={day.value} value={day.value}>
                                        {day.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Start Time</Label>
                            <Input
                                type="time"
                                value={form.startTime}
                                onChange={e => {
                                    const newStart = e.target.value;

                                    // Jeśli endTime jest puste lub jest wcześniejsze/równe nowemu startTime, ustaw endTime na startTime + 1h
                                    if (!form.endTime || form.endTime <= newStart) {
                                        const [h, m] = newStart.split(':').map(Number);
                                        let newEndH = h + 1;
                                        if (newEndH >= 24) newEndH = 23;
                                        const newEnd = `${String(newEndH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

                                        setForm(prev => ({ ...prev, startTime: newStart, endTime: newEnd }));
                                    } else {
                                        // Jeśli endTime jest poprawne, tylko ustaw startTime
                                        setForm(prev => ({ ...prev, startTime: newStart }));
                                    }
                                }}
                            />

                            <Input
                                type="time"
                                value={form.endTime}
                                onChange={e => {
                                    const newEnd = e.target.value;

                                    // Blokuj ustawienie endTime mniejszego/równego startTime
                                    if (form.startTime && newEnd <= form.startTime) {
                                        toast.error('End time must be after start time.');
                                        return;
                                    }

                                    setForm(prev => ({ ...prev, endTime: newEnd }));
                                }}
                            />
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={loading} className="w-full">
                        {loading ? 'Saving...' : 'Save Availability'}
                    </Button>
                </div>

                {/* Display current availability */}
                {availabilityData?.availability && (
                    <div className="pt-6 space-y-4">
                        <h3 className="font-semibold text-lg">Current Availability</h3>
                        {availabilityData.availability.map(a => (
                            <div key={a.dayOfWeek}>
                                <p className="font-medium">{a.dayOfWeek}</p>
                                <ul className="pl-4 list-disc text-sm text-muted-foreground">
                                    {a.hours.map((h, i) => (
                                        <li key={i}>
                                            {h.fromTime} - {h.toTime} ({h.bookedCount}/{h.maxCount} booked)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
