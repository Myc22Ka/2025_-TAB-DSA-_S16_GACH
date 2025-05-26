import React from 'react';
import AttractionCard from './AttractionCard';
import useAllAttractions from '@/hooks/useAttractionsDetails';

const AttractionsList: React.FC = () => {
    const { data } = useAllAttractions();

    return data?.map((attraction, index) => <AttractionCard key={attraction.name} attraction={attraction} currentId={index + 1} />);
};

export default AttractionsList;
