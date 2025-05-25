import React from 'react';
import useAllAttractions from '@/hooks/useAttractionsDetails';
import DefaultLayout from '@/layouts/DefaultLayout';

const PriceList: React.FC = () => {
    const { data: attractions, isLoading } = useAllAttractions();

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <DefaultLayout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Prices of attractions</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">Attraction</th>
                                <th className="px-4 py-2 text-left">Price ($)</th>
                                <th className="px-4 py-2 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attractions?.map(attraction => (
                                <tr key={attraction.name} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-2 font-medium">{attraction.name}</td>
                                    <td className="px-4 py-2">{attraction.price.toFixed(2)} zł</td>
                                    <th className="px-4 py-2 text-left font-medium">60 min</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PriceList;
