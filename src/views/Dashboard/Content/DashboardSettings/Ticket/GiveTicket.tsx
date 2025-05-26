import React, { useState } from 'react';
import { useAllAttractions } from '@/hooks/useAttractionsDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getApiErrorMessage, post } from '@/lib/axios';
import { toast } from 'sonner';

const GiveTicket: React.FC = () => {
    const { data: attractions } = useAllAttractions();

    const [email, setEmail] = useState('');
    const [attractionId, setAttractionId] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!email || attractionId === null || duration === null) {
            toast.error('Please fill in all fields!');
            return;
        }

        try {
            const query = new URLSearchParams({
                email,
                attractionId: attractionId.toString(),
                durationMinutes: duration.toString(),
            }).toString();

            await post(`/api/tickets/give?${query}`);
            toast.success('🎟️ Ticket successfully sold!');

            // Reset form
            setEmail('');
            setAttractionId(null);
            setDuration(null);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Sell Ticket</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Customer Email</label>
                    <Input type="email" placeholder="Customer Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Attraction</label>
                    <Select onValueChange={value => setAttractionId(Number(value))} value={attractionId?.toString() || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an attraction" />
                        </SelectTrigger>
                        <SelectContent>
                            {attractions?.map((attr, index) => (
                                <SelectItem key={index} value={(index + 1).toString()}>
                                    {attr.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Duration</label>
                    <Select onValueChange={value => setDuration(Number(value))} value={duration?.toString() || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Duration (minutes)" />
                        </SelectTrigger>
                        <SelectContent>
                            {[60, 90, 120].map(min => (
                                <SelectItem key={min} value={min.toString()}>
                                    {min} minutes
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                    Sell Ticket
                </Button>
            </div>
        </div>
    );
};

export default GiveTicket;
