import React, { useEffect } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Section from '@/layouts/Section';
import useAllAttractions from '@/hooks/useAttractionsDetails';
function Home() {
    const { data } = useAllAttractions();

    useEffect(() => {
        console.log('Attraction Details:', data);
    }, [data]);

    return (
        <DefaultLayout>
            <Section>
                <div className="w-full px-6 md:px-12 lg:px-24">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-kanchenjunga font-bold text-gray-900 dark:text-white mb-4">Witamy!</h1>
                        <p className="text-lg font-kanchenjunga text-gray-700 dark:text-gray-300">Twoja przygoda zaczyna się tutaj.</p>
                    </div>
                </div>
            </Section>
        </DefaultLayout>
    );
}

export default Home;
