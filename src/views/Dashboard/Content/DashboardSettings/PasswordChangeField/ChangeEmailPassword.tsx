import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { passwordOnlySchema, PasswordFormValues } from '@/components/auth/utils/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import PasswordField from './PasswordField';
import { getApiErrorMessage, patch } from '@/lib/axios';

const ChangePasswordForm: React.FC = () => {
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordOnlySchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmationPassword: '',
        },
    });

    const changePassword = async (data: PasswordFormValues) => {
        try {
            await patch(`/api/users/change-password`, data);
            toast.success(`You changed password successfully.`);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const onSubmit = (data: PasswordFormValues) => {
        changePassword(data);

        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <PasswordField control={form.control} name="currentPassword" label="Current Password" placeholder="Current Password" />
                <PasswordField control={form.control} name="newPassword" label="New Password" placeholder="New Password" showRequirements />
                <PasswordField control={form.control} name="confirmationPassword" label="Confirm New Password" placeholder="Confirm New Password" />
                <Button type="submit" className="w-full">
                    Save Password
                </Button>
            </form>
        </Form>
    );
};

export default ChangePasswordForm;
