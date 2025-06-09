import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InstructorWithAvailability } from '@/interfaces/IInstructor';
import { get, getApiErrorMessage } from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

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
            <div className="flex flex-col items-center space-y-2">
                <img
                    src={instructor.photoUrl}
                    alt={`${instructor.firstname} ${instructor.lastname}`}
                    className="w-40 h-40 rounded-full object-cover shadow-md"
                />
                <h1 className="text-2xl font-bold">
                    {instructor.firstname} {instructor.lastname}
                </h1>
                <p className="text-muted-foreground">{instructor.phoneNumber}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Availability</h2>
                <div className="space-y-4">
                    {availability.map((day, i) => (
                        <Card key={i} className="p-4">
                            <CardContent>
                                <div className="font-medium mb-2">{day.dayOfWeek}</div>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {day.hours.map((slot, j) => (
                                        <li key={j}>
                                            {slot.fromTime} - {slot.toTime} ({slot.bookedCount}/{slot.maxCount})
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
