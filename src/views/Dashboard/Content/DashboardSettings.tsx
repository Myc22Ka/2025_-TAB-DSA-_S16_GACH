import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginOnlySchema, emailOnlySchema, passwordOnlySchema } from '@/components/auth/utils/zod';

const DashboardSettings: React.FC = () => {
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

    // Login form
    const loginForm = useForm<z.infer<typeof loginOnlySchema>>({
        resolver: zodResolver(loginOnlySchema),
        defaultValues: { login: '' },
    });

    // Email form
    const emailForm = useForm<z.infer<typeof emailOnlySchema>>({
        resolver: zodResolver(emailOnlySchema),
        defaultValues: { email: '' },
    });

    // Password form
    const passwordForm = useForm<z.infer<typeof passwordOnlySchema>>({
        resolver: zodResolver(passwordOnlySchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const onLoginSubmit = (data: z.infer<typeof loginOnlySchema>) => {
        console.log('New login:', data);
        toast.success('Your login has been successfully changed.');
    };

    const onEmailSubmit = (data: z.infer<typeof emailOnlySchema>) => {
        console.log('New email:', data);
        toast.success('Your email address has been successfully changed.');
    };

    const onPasswordSubmit = (data: z.infer<typeof passwordOnlySchema>) => {
        console.log('New password:', data);
        toast.success('Your password has been successfully changed.');
    };

    return (
        <div className="w-full max-w-2xl mx-auto scroll-pt-36">
            <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

            <Accordion type="multiple" className="w-full space-y-4">
                {/* LOGIN */}
                <AccordionItem value="login">
                    <AccordionTrigger>Change Login</AccordionTrigger>
                    <AccordionContent>
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                                <FormField
                                    control={loginForm.control}
                                    name="login"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Login</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter new login" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Save Login</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>

                {/* EMAIL */}
                <AccordionItem value="email">
                    <AccordionTrigger>Change Email</AccordionTrigger>
                    <AccordionContent>
                        <Form {...emailForm}>
                            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                                <FormField
                                    control={emailForm.control}
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
                                <Button type="submit">Save Email</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>

                {/* PASSWORD */}
                <AccordionItem value="password">
                    <AccordionTrigger>Change Password</AccordionTrigger>
                    <AccordionContent>
                        <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    onFocus={() => setIsPasswordFocused(true)}
                                                    onBlur={() => setIsPasswordFocused(false)}
                                                    placeholder="New Password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {isPasswordFocused && (
                                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                                        <p>• Min. 9 characters</p>
                                        <p>• 1 uppercase letter</p>
                                        <p>• 1 number</p>
                                        <p>• 1 special character</p>
                                    </div>
                                )}
                                <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    onFocus={() => setIsPasswordFocused(true)}
                                                    onBlur={() => setIsPasswordFocused(false)}
                                                    placeholder="Confirm Password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Save Password</Button>
                            </form>
                        </Form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DashboardSettings;
