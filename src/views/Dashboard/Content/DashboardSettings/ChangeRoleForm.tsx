import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { roleSchema, RoleFormValues } from '@/components/auth/utils/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { roles } from '@/interfaces/IUser';
import { getApiErrorMessage, post } from '@/lib/axios';

const ChangeRoleForm: React.FC = () => {
    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: { role: 'USER' },
    });

    const onSubmit = (data: RoleFormValues) => {
        post(`/api/role-change-requests?requestedRole=${data.role}`)
            .then(() => {
                toast('Role changing request send successfully');
            })
            .catch(error => {
                toast.error(getApiErrorMessage(error));
            });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select New Role</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(role => (
                                        <SelectItem key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Request Role
                </Button>
            </form>
        </Form>
    );
};

export default ChangeRoleForm;
