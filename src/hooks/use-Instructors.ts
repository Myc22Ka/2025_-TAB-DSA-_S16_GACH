import { useEffect, useState } from 'react';
import { get, getApiErrorMessage } from '@/lib/axios';
import { Instructor } from '@/interfaces/IInstructor';
import { toast } from 'sonner';

export interface Availability {
    date: string;
    available: boolean;
}

export const useInstructors = () => {
    const [instructors, setInstructors] = useState<Instructor[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const data = (await get('/api/users/instructors')) as Instructor[];
                setInstructors(data);
            } catch (error) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    const fetchAvailability = async (instructorId: number): Promise<Availability[] | null> => {
        try {
            const availability = await get(`/api/users/instructors/${instructorId}/availability`);
            return availability as Availability[];
        } catch (error) {
            toast.error(getApiErrorMessage(error));
            return null;
        }
    };

    return {
        instructors,
        loading,
        fetchAvailability,
    };
};
