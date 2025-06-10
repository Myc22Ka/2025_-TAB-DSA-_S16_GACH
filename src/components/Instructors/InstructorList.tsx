import React from 'react';
import { useInstructors } from '@/hooks/use-Instructors';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 mt-12">
                {instructors?.map(instructor => (
                    <Link
                        key={instructor.id}
                        to={`/instructors/${instructor.id}`}
                        className="block rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500"
                    >
                        <Card className="p-6 rounded-2xl h-full flex flex-col items-center bg-white dark:bg-gray-800">
                            <CardContent className="flex flex-col items-center text-center space-y-4">
                                <Avatar className="w-14 h-14 ring-2 ring-primary-500 ring-offset-2 rounded-full">
                                    <AvatarImage src={instructor.photoUrl} alt={`${instructor.firstname} ${instructor.lastname}`} />
                                    <AvatarFallback className="flex items-center justify-center w-full h-full text-xl font-semibold text-primary-600 dark:text-primary-400">
                                        {instructor.firstname[0]}
                                        {instructor.lastname[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {instructor.firstname} {instructor.lastname}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">{instructor.phoneNumber}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default InstructorsList;
