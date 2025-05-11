import React from 'react';
import AttractionCard from './AttractionCard';
import useAllAttractions from '@/hooks/useAttractionsDetails';

const AttractionsList: React.FC = () => {
    const { data } = useAllAttractions();

    return data?.map(attraction => <AttractionCard key={attraction.name} attraction={attraction} />);
};

export default AttractionsList;
