import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout'; // <-- dodaj ten import
import Section from '@/layouts/Section';
import AttractionsList from '@/components/Attractions/AttractionsList';

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

const Attractions = () => {
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
            {/* Sekcja powitalna */}
            <section className="w-full py-20">
                <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-6">Attraction list</h1>
                    <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto">
                        Discover our water attractions – from slides to relaxation zones. We are waiting for you every day!
                    </p>
                </div>
            </section>

            {/* Lista atrakcji */}
            <Section>
                <div className="px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-10">Attractions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AttractionsList />
                    </div>
                </div>
            </Section>
        </DefaultLayout>
    );
};

export default Attractions;
