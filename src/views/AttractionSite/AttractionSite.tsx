import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import { get } from '@/lib/axios';

import AttractionHeader from './AttractionHeader';
import AttractionInfo from './AttractionInfo';
import AttractionSchedule from './AttractionSchedule';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';

interface OpeningHour {
    from: string;
    to: string;
}

interface OpeningDay {
    dayOfWeek: string;
    hours: OpeningHour[];
}

export interface IAttractionDetails {
    id?: number;
    name: string;
    description: string;
    imageUrl: string;
    maxPeopleAmount: number;
    currentPeopleAmount: number;
    price: number;
    openingDays: OpeningDay[];
}

const DAYS_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

const DAY_NAMES_PL: Record<string, string> = {
    MONDAY: 'Mon',
    TUESDAY: 'Tue',
    WEDNESDAY: 'Wed',
    THURSDAY: 'Thu',
    FRIDAY: 'Fri',
    SATURDAY: 'Sat',
    SUNDAY: 'Sun',
};

const AttractionSite = () => {
    const { id } = useParams<{ id: string }>();
    const [attraction, setAttraction] = useState<IAttractionDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttraction = async () => {
            try {
                const res = await get<IAttractionDetails>(`/api/attractions/${id}`);
                setAttraction(res);
            } catch (error) {
                console.error('Error fetching attraction:', error);
                setAttraction(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAttraction();
    }, [id]);

    if (loading) {
        return (
            <DefaultLayout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <p className="italic text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
            </DefaultLayout>
        );
    }

    if (!attraction) {
        return (
            <DefaultLayout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <p className="text-red-600 dark:text-red-400 font-semibold">Attraction not found</p>
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <Card className="max-w-5xl mx-auto p-8 space-y-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
                <CardContent>
                    <AttractionHeader name={attraction.name} imageUrl={attraction.imageUrl} />

                    <AttractionInfo
                        description={attraction.description}
                        currentPeopleAmount={attraction.currentPeopleAmount}
                        maxPeopleAmount={attraction.maxPeopleAmount}
                        price={attraction.price}
                    />

                    <Separator className="my-8" />

                    <AttractionSchedule openingDays={attraction.openingDays} DAYS_ORDER={DAYS_ORDER} DAY_NAMES_PL={DAY_NAMES_PL} />
                </CardContent>
            </Card>
        </DefaultLayout>
    );
};

export default AttractionSite;
