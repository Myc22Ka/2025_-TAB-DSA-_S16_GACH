import React from 'react';

interface AttractionHeaderProps {
    name: string;
    imageUrl: string;
}

const AttractionHeader: React.FC<AttractionHeaderProps> = ({ name, imageUrl }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white">{name}</h1>

            <div className="flex justify-center">
                <img
                    src={imageUrl !== 'x' ? imageUrl : '/placeholder.jpg'}
                    alt={name}
                    className="rounded-xl max-h-[420px] w-full max-w-4xl object-cover shadow-md"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default AttractionHeader;
