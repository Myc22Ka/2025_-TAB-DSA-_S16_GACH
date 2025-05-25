import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout'; // <-- dodaj ten import

interface OpeningHour {
    from: string;
    to: string;
}

interface OpeningDay {
    dayOfWeek: string;
    hours: OpeningHour[];
}

interface IAttractionDetails {
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
                const res = await fetch(`http://localhost:8080/api/attractions/${id}`);
                if (!res.ok) throw new Error('Attraction not found');
                const data: IAttractionDetails = await res.json();
                setAttraction(data);
            } catch (error) {
                console.error('Error fetching attraction:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttraction();
    }, [id]);

    return (
        <DefaultLayout>
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                {loading && <div>Loading...</div>}
                {!loading && !attraction && <div>Attraction not found</div>}

                {attraction && (
                    <>
                        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">{attraction.name}</h1>

                        <img
                            src={attraction.imageUrl !== 'x' ? attraction.imageUrl : '/placeholder.jpg'}
                            alt={attraction.name}
                            className="w-full rounded-xl max-h-[400px] object-cover"
                        />

                        <p className="text-gray-700 dark:text-gray-300 text-lg">{attraction.description}</p>

                        <div className="flex flex-wrap gap-4 text-gray-800 dark:text-gray-200">
                            <div>
                                <strong>Current Visitors:</strong> {attraction.currentPeopleAmount} / {attraction.maxPeopleAmount}
                            </div>
                            <div>
                                <strong>Price:</strong> ${attraction.price.toFixed(2)}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">Schedule:</h2>
                            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                                {DAYS_ORDER.map(day => {
                                    const opening = attraction.openingDays.find(d => d.dayOfWeek === day);
                                    return (
                                        <div key={day} className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                                            <div className="mb-1 font-bold">{DAY_NAMES_PL[day]}</div>
                                            {opening ? (
                                                <div className="space-y-1">
                                                    {opening.hours.map((h, i) => (
                                                        <div key={i} className="text-xs">
                                                            {h.from.slice(0, 5)} - {h.to.slice(0, 5)}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-gray-400">Closed</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DefaultLayout>
    );
};

export default AttractionSite;
