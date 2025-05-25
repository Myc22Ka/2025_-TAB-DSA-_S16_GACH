import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './PasswordChangeField/ChangeEmailPassword';
import ChangeRoleForm from './ChangeRoleForm';

const DashboardSettings: React.FC = () => {
    return (
        <div className="w-full max-w-2xl mx-auto scroll-pt-36">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Account Settings</h2>

            <Accordion type="multiple" className="w-full space-y-4">
                <AccordionItem value="email">
                    <AccordionTrigger>Change Email</AccordionTrigger>
                    <AccordionContent>
                        <ChangeEmailForm />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="password">
                    <AccordionTrigger>Change Password</AccordionTrigger>
                    <AccordionContent>
                        <ChangePasswordForm />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="role">
                    <AccordionTrigger>Change User Role</AccordionTrigger>
                    <AccordionContent>
                        <ChangeRoleForm />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DashboardSettings;
