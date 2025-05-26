import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { getApiErrorMessage, patch } from '@/lib/axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthProvider';

type ProfileFormValues = {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: 'F' | 'M';
};

const DashboardOverview: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { user, setUser } = useAuth();

    const getValue = (value: string | null | undefined, defaultValue = 'No data available') => value ?? defaultValue;

    const userDetails = [
        { label: 'Login', name: 'login', value: user?.login },
        { label: 'Email', name: 'email', value: user?.email },
        { label: 'First Name', name: 'firstname', value: user?.firstname },
        { label: 'Last Name', name: 'lastname', value: user?.lastname },
        { label: 'Phone number', name: 'phoneNumber', value: user?.phoneNumber },
        { label: 'Address', name: 'address', value: user?.address },
        { label: 'Date of birth', name: 'dateOfBirth', value: user?.dateOfBirth },
        { label: 'Gender', name: 'gender', value: user?.gender === 'F' ? 'Female' : 'Male' },
        { label: 'Role', name: 'role', value: user?.role },
        { label: 'Cash balance', name: 'cash', value: `${user?.cash} zł` },
    ];

    const formFields = userDetails
        .filter(({ name }) => !['login', 'email', 'role', 'cash'].includes(name))
        .map(({ label, name, value }) => ({
            label,
            name: name as keyof ProfileFormValues,
            value,
        }));

    const defaultValues: ProfileFormValues = formFields.reduce(
        (acc, { name, value }) => {
            if (name === 'gender') {
                acc.gender = value === 'F' ? 'F' : 'M';
            } else {
                acc[name] = value ?? '';
            }
            return acc;
        },
        {
            firstname: '',
            lastname: '',
            phoneNumber: '',
            address: '',
            dateOfBirth: '',
            gender: 'M',
        } as ProfileFormValues
    );

    const form = useForm<ProfileFormValues>({ defaultValues });

    const changeUserData = async (data: ProfileFormValues) => {
        try {
            await patch(`/api/users/update`, data);
            setUser({
                ...user!,
                ...data,
            });
            toast.success(`You updated user's data successfully.`);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const onSubmit = (data: ProfileFormValues) => {
        changeUserData(data);

        setIsFormVisible(false);
    };

    return (
        <Card className="w-full max-w-3xl mx-auto rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center ">
                    <div>
                        <CardTitle className="text-3xl text-primary">Hi {user?.firstname ?? user?.login}!</CardTitle>
                        <CardDescription className="text-muted-foreground">Welcome to your user panel</CardDescription>
                    </div>

                    <Dialog open={isFormVisible} onOpenChange={setIsFormVisible}>
                        <DialogTrigger asChild>
                            <Button>{isFormVisible ? 'Cancel' : 'Edit Profile'}</Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-border space-y-6">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>Enter new details into your profile.</DialogDescription>
                            </DialogHeader>

                            {/* Form z shadcn/ui + react-hook-form */}
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                                    {formFields.map(({ label, name }) => (
                                        <FormField
                                            key={name}
                                            control={form.control}
                                            name={name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{label}</FormLabel>
                                                    <FormControl>
                                                        {name === 'gender' ? (
                                                            <Controller
                                                                name={name}
                                                                control={form.control}
                                                                render={({ field: controllerField }) => (
                                                                    <Select value={controllerField.value} onValueChange={controllerField.onChange}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Choose Gender" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="M">Male</SelectItem>
                                                                            <SelectItem value="F">Female</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                        ) : (
                                                            <Input {...field} type={name === 'dateOfBirth' ? 'date' : 'text'} />
                                                        )}
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ))}

                                    <div className="flex justify-end space-x-2 pt-4">
                                        <Button type="button" onClick={() => setIsFormVisible(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">Save Change</Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Wyświetlanie danych */}
                <div className="space-y-4">
                    {userDetails.map(({ label, value }, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-border last:border-none pb-2">
                            <span className="font-medium">{label}:</span>
                            <span>{getValue(value)}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardOverview;
