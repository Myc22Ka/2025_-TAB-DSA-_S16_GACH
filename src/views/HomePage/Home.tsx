import React, { useEffect } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import useAllAttractions from '@/hooks/useAttractionsDetails';
import AttractionsList from '@/components/Attractions/AttractionsList';

function Home() {
    const { data } = useAllAttractions();

    useEffect(() => {
        console.log('Attraction Details:', data);
    }, [data]);

    return (
        <DefaultLayout>
            <Section>
                <div className="w-full px-6 md:px-12 lg:px-24 text-center mb-10">
                    <h1 className="text-4xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-4">Witamy w Aquaparku!</h1>
                    <p className="text-lg font-kanchenjunga text-gray-700 dark:text-gray-300">Odkryj nasze atrakcje – kliknij, aby dowiedzieć się więcej!</p>
                </div>
            </Section>

            <Section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 lg:px-24">
                    <AttractionsList />
                </div>
            </Section>
        </DefaultLayout>
    );
}

export default Home;
