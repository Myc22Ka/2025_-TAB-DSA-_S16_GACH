import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { IAttractionDetails } from '@/interfaces/IAttractionDetails';
import { useNavigate } from 'react-router-dom';

interface AttractionCardProps {
    attraction: IAttractionDetails;
    currentId: number;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, currentId }) => {
    const navigate = useNavigate();
    return (
        <Card
            key={attraction.name}
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-0"
        >
            <img src={attraction.imageUrl} alt={attraction.name} className="h-64 w-full object-cover" />
            <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{attraction.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{attraction.description}</p>
                <div className="flex items-center justify-end mt-2 gap-2">
                    <Badge variant="default">Current: {attraction.currentPeopleAmount}</Badge>
                    <Badge variant="outline">Max: {attraction.maxPeopleAmount}</Badge>
                </div>
                <Button
                    className="w-full mt-4"
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/attraction/${currentId}`);
                    }}
                >
                    See more
                </Button>
            </CardContent>
        </Card>
    );
};

export default AttractionCard;
