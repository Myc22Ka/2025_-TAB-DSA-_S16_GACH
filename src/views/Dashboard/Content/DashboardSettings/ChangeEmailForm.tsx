import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { emailOnlySchema, EmailFormValues } from '@/components/auth/utils/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage, patch } from '@/lib/axios';

const ChangeEmailForm: React.FC = () => {
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailOnlySchema),
        defaultValues: { email: '' },
    });

    const changeEmail = async (data: EmailFormValues) => {
        try {
            await patch(`/api/users/change-email`, data);
            toast.success(`You changed email successfully.`);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const onSubmit = (data: EmailFormValues) => {
        changeEmail(data);

        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter new email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Save Email
                </Button>
            </form>
        </Form>
    );
};

export default ChangeEmailForm;
