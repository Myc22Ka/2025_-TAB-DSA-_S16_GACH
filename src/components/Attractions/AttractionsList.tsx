import React from 'react';
import AttractionCard from './AttractionCard';
import useAllAttractions from '@/hooks/useAttractionsDetails';

const AttractionsList: React.FC = () => {
    let currentId = 1;
    const { data } = useAllAttractions();

    return data?.map((attraction, index) => <AttractionCard key={attraction.name} attraction={attraction} currentId={index + 1} />);
    currentId++;
};

export default AttractionsList;
