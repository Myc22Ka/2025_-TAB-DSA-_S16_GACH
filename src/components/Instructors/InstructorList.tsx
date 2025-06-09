import React from 'react';
import { useInstructors } from '@/hooks/use-Instructors';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Link } from 'react-router-dom';

const InstructorsList: React.FC = () => {
    const { instructors, loading } = useInstructors();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 mt-12">
                {instructors?.map(instructor => (
                    <Link key={instructor.id} to={`/instructors/${instructor.id}`} className="hover:shadow-lg transition-shadow duration-300">
                        <Card className="p-4 rounded-2xl shadow-md h-full">
                            <CardContent className="flex flex-col items-center text-center space-y-2">
                                <img
                                    src={instructor.photoUrl}
                                    alt={`${instructor.firstname} ${instructor.lastname}`}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="font-semibold text-lg">
                                    {instructor.firstname} {instructor.lastname}
                                </div>
                                <div className="text-muted-foreground text-sm">{instructor.phoneNumber}</div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default InstructorsList;
