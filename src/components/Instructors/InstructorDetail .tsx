import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InstructorWithAvailability } from '@/interfaces/IInstructor';
import { get, getApiErrorMessage } from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { post } from '@/lib/axios';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';
import { Phone } from 'lucide-react';

const InstructorDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [instructorData, setInstructorData] = useState<InstructorWithAvailability | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const data = await get(`/api/users/instructors/${id}/availability`);
                setInstructorData(data as InstructorWithAvailability);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInstructor();
        }
    }, [id]);

    const handleBooking = async (dayOfWeek: string, fromTime: string, toTime: string) => {
        try {
            await post('/api/appointments/book', {
                instructorId: Number(id),
                dayOfWeek,
                startTime: fromTime,
                endTime: toTime,
            });

            toast.success('You have successfully booked a lesson!');
            window.location.reload();
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    if (loading) {
        return (
            <div className="space-y-4 p-6">
                <Skeleton className="h-40 w-40 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (!instructorData) {
        return <div className="text-center text-lg text-muted-foreground mt-12">Instructor not found.</div>;
    }

    const { instructor, availability } = instructorData;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <Card className="text-center">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 shadow-md">
                        <AvatarImage src={instructor.photoUrl} alt={`${instructor.firstname} ${instructor.lastname}`} />
                        <AvatarFallback>{(instructor.firstname?.[0] ?? '') + (instructor.lastname?.[0] ?? '')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl font-bold">
                            {instructor.firstname} {instructor.lastname}
                        </CardTitle>
                        <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm mt-1">
                            <Phone className="w-4 h-4" /> {instructor.phoneNumber}
                        </p>
                    </div>
                </CardHeader>
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-4">Availability</h2>
                <div className="space-y-4">
                    {availability.map((day, i) => (
                        <Card key={i} className="p-3">
                            <CardTitle className=" text-base font-semibold">{day.dayOfWeek}</CardTitle>
                            <Separator className="mb-2" />
                            <CardContent className="space-y-2">
                                <ul className="space-y-1">
                                    {day.hours.map((slot, j) => (
                                        <li key={j} className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span>
                                                {slot.fromTime} - {slot.toTime} ({slot.bookedCount}/{slot.maxCount})
                                            </span>
                                            {slot.bookedCount < slot.maxCount && (
                                                <Button size="sm" variant="default" onClick={() => handleBooking(day.dayOfWeek, slot.fromTime, slot.toTime)}>
                                                    Zapisz się
                                                </Button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorDetail;
