import { Card } from '@/components/ui/card';
import React from 'react';

interface Hour {
    from: string;
    to: string;
}

interface OpeningDay {
    dayOfWeek: string;
    hours: Hour[];
}

interface AttractionScheduleProps {
    openingDays: OpeningDay[];
    DAYS_ORDER: string[];
    DAY_NAMES_PL: Record<string, string>;
}

const AttractionSchedule: React.FC<AttractionScheduleProps> = ({ openingDays, DAYS_ORDER, DAY_NAMES_PL }) => {
    return (
        <section>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Schedule</h2>

            <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-gray-800 dark:text-gray-300">
                {DAYS_ORDER.map(day => {
                    const opening = openingDays.find(d => d.dayOfWeek === day);
                    return (
                        <Card
                            key={day}
                            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
                            role="region"
                            aria-label={`Schedule for ${DAY_NAMES_PL[day]}`}
                        >
                            <div className="mb-2 font-semibold text-gray-700 dark:text-gray-300">{DAY_NAMES_PL[day]}</div>
                            {opening ? (
                                <div className="space-y-1">
                                    {opening.hours.map((h, i) => (
                                        <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
                                            {h.from.slice(0, 5)} – {h.to.slice(0, 5)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xs italic text-gray-400 dark:text-gray-500">Closed</div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default AttractionSchedule;
