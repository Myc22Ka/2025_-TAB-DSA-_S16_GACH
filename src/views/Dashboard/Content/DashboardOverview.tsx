import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { User } from '@/interfaces/IUser';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';

type DashboardOverviewProps = {
    user: User | null;
};

type ProfileFormValues = {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: string;
};

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const getValue = (value: string | null | undefined, defaultValue = 'No data available') => value ?? defaultValue;

    const userDetails = [
        { label: 'Login', name: 'login', value: user?.login },
        { label: 'Email', name: 'email', value: user?.email },
        { label: 'First Name', name: 'firstname', value: user?.firstname },
        { label: 'Last Name', name: 'lastname', value: user?.lastname },
        { label: 'Phone number', name: 'phoneNumber', value: user?.phoneNumber },
        { label: 'Address', name: 'address', value: user?.address },
        { label: 'Date of birth', name: 'dateOfBirth', value: user?.dateOfBirth },
        { label: 'Gender', name: 'gender', value: user?.gender },
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

    const defaultValues = formFields.reduce(
        (acc, { name, value }) => {
            acc[name] = value ?? '';
            return acc;
        },
        {} as Record<keyof ProfileFormValues, string>
    );

    const form = useForm<ProfileFormValues>({ defaultValues });

    const onSubmit = (data: ProfileFormValues) => {
        console.log('Zapisujemy profil:', data);
        setIsFormVisible(false);
    };

    return (
        <Card className="w-full max-w-3xl mx-auto rounded-xl bg-secondary text-secondary-foreground shadow-lg">
            <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-3xl text-primary">Hi {user?.firstname ?? user?.login}!</CardTitle>
                        <CardDescription className="text-muted-foreground">Welcome to your user panel</CardDescription>
                    </div>

                    <Dialog open={isFormVisible} onOpenChange={setIsFormVisible}>
                        <DialogTrigger asChild>
                            <Button>{isFormVisible ? 'Cancel' : 'Edit Profile'}</Button>
                        </DialogTrigger>

                        <DialogContent className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>Enter new details into your profile.</DialogDescription>
                            </DialogHeader>

                            {/* Form z shadcn/ui + react-hook-form */}
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                                            <SelectItem value="Male">Male</SelectItem>
                                                                            <SelectItem value="Female">Female</SelectItem>
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
                                        <Button variant="outline" type="button" onClick={() => setIsFormVisible(false)}>
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
