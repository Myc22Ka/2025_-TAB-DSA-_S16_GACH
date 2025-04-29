import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    heading?: string;
    subheading?: string;
}

const Section: React.FC<SectionProps> = ({ children, className, heading, subheading }) => {
    return (
        <section className={cn('py-12 px-6 md:px-12 lg:px-24', className)}>
            <div className="max-w-screen-lg mx-auto text-center">
                {heading && <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{heading}</h2>}
                {subheading && <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{subheading}</p>}
            </div>
            <div className="mt-8">{children}</div>
        </section>
    );
};

export default Section;
