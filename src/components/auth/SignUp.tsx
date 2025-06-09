import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { authenticate, register } from './utils/service';
import { FormSignUpData, formSignUpSchema } from './utils/zod';
import { toast } from 'sonner';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuth } from '@/context/AuthProvider';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);
    const form = useForm<FormSignUpData>({
        resolver: zodResolver(formSignUpSchema),
        defaultValues: {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit: SubmitHandler<FormSignUpData> = async values => {
        try {
            await register(values);
            toast.success('Registration successful');

            const user = await authenticate();
            setUser(user);
            navigate('/');
        } catch (error) {
            toast(`Registration error: ${error}`);
        }
    };

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Card className="w-full max-w-md shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Sign up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="login"
                                    render={({ field }: { field: ControllerRenderProps<FormSignUpData, 'login'> }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }: { field: ControllerRenderProps<FormSignUpData, 'email'> }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }: { field: ControllerRenderProps<FormSignUpData, 'password'> }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    onFocus={() => setIsPasswordFocused(true)}
                                                    onBlur={() => setIsPasswordFocused(false)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }: { field: ControllerRenderProps<FormSignUpData, 'confirmPassword'> }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    onFocus={() => setIsPasswordFocused(true)}
                                                    onBlur={() => setIsPasswordFocused(false)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {isPasswordFocused && (
                                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                                        <p>• Minimum 9 characters</p>
                                        <p>• At least 1 uppercase letter</p>
                                        <p>• At least 1 digit</p>
                                        <p>• At least 1 special character</p>
                                    </div>
                                )}
                                <Button type="submit" className="w-full">
                                    Sign up
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default SignUp;
