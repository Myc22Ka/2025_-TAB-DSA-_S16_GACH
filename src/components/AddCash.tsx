import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getApiErrorMessage, post } from '@/lib/axios';
import { cn } from '@/lib/utils';

type AddCashForm = {
    amount: string;
};

type AddCashProps = {
    size?: 'sm' | 'xs';
};

const AddCash: React.FC<AddCashProps> = ({ size = 'sm' }) => {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddCashForm>();

    const onSubmit = async (data: AddCashForm) => {
        const amount = parseFloat(data.amount);

        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a positive amount.');
            return;
        }

        try {
            await post(`/api/users/add-cash?amount=${amount}`);
            toast.success(`Successfully added ${amount.toFixed(2)} zł to your balance.`);
            reset();
            setOpen(false);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className={cn('px-2 h-7 text-xs', size === 'xs' && 'text-xs h-6 px-2', size === 'sm' && 'text-sm h-8 px-3')}>
                    +
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Cash</DialogTitle>
                    <DialogDescription>Enter the amount you want to add to your balance.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register('amount', {
                                required: 'Amount is required',
                                validate: value => parseFloat(value) > 0 || 'Amount must be positive',
                            })}
                            placeholder="Enter amount in zł"
                            type="number"
                            step="0.01"
                            min="0.01"
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCash;
