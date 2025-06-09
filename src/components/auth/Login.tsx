import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { authenticate, login as loginService } from './utils/service';
import { FormLoginData, formLoginSchema } from './utils/zod';
import { toast } from 'sonner';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<FormLoginData>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FormLoginData> = async values => {
        try {
            await loginService(values);
            toast.success('You have logged in successfully');

            const user = await authenticate();
            setUser(user);
            navigate('/');
        } catch (error) {
            toast.error(`Login error: ${error}`);
        }
    };

    return (
        <DefaultLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Card className="w-full max-w-md shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }: { field: ControllerRenderProps<FormLoginData, 'email'> }) => (
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
                                    render={({ field }: { field: ControllerRenderProps<FormLoginData, 'password'> }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} className="pr-10" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-700"
                                                        tabIndex={-1}
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    {form.formState.isSubmitting ? 'Login...' : 'Sign In'}
                                </Button>
                                <div className="text-center mt-2">
                                    <a href="/signup" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                        Don&apos;t have an account? Sign up
                                    </a>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default Login;
