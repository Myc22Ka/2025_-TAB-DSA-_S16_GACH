import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordRequirements from './PasswordRequirements';
import { PasswordFormValues } from '@/components/auth/utils/zod';
import { Control } from 'react-hook-form';

interface PasswordFieldProps {
    control: Control<PasswordFormValues>;
    name: keyof PasswordFormValues;
    label: string;
    placeholder?: string;
    showRequirements?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ control, name, label, placeholder, showRequirements = false }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} placeholder={placeholder} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
                    </FormControl>
                    <FormMessage />
                    {showRequirements && <PasswordRequirements visible={isFocused} />}
                </FormItem>
            )}
        />
    );
};

export default PasswordField;
