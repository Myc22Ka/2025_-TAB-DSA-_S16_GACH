import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import AttractionsList from '@/components/Attractions/AttractionsList';

function Home() {
    return (
        <DefaultLayout>
            <Section>
                <div className="w-full px-6 md:px-12 lg:px-24 text-center mb-10">
                    <h1 className="text-4xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-4">Welcome in Aquapark!</h1>
                    <p className="text-lg font-kanchenjunga text-gray-700 dark:text-gray-300">Discover our attractions – click to learn more!</p>
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
