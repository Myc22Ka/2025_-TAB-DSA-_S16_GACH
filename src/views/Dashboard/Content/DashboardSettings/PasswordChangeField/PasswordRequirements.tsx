import React from 'react';

interface PasswordRequirementsProps {
    visible: boolean;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ visible }) => {
    return (
        <div
            className={`text-xs text-muted-foreground space-y-1 transition-all duration-200 ease-in-out overflow-hidden ${
                visible ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
            }`}
            aria-live="polite"
        >
            <p>• At least 9 characters</p>
            <p>• One uppercase letter</p>
            <p>• One number</p>
            <p>• One special character</p>
        </div>
    );
};

export default PasswordRequirements;
