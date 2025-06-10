import { Badge } from '@/components/ui/badge';
import React from 'react';

interface AttractionInfoProps {
    description: string;
    currentPeopleAmount: number;
    maxPeopleAmount: number;
    price: number;
}

const AttractionInfo: React.FC<AttractionInfoProps> = ({ description, currentPeopleAmount, maxPeopleAmount, price }) => {
    return (
        <section className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>

            <div className="flex flex-wrap justify-center gap-12 text-center">
                <div className="flex flex-col items-center space-y-1">
                    <Badge variant="secondary" className="uppercase tracking-wide">
                        Current Visitors
                    </Badge>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {currentPeopleAmount} / {maxPeopleAmount}
                    </span>
                </div>

                <div className="flex flex-col items-center space-y-1">
                    <Badge variant="secondary" className="uppercase tracking-wide">
                        Price
                    </Badge>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">${price.toFixed(2)}</span>
                </div>
            </div>
        </section>
    );
};

export default AttractionInfo;
