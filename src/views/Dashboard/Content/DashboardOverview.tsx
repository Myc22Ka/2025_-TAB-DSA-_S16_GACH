import React, { useState } from 'react';
import { User } from '@/interfaces/IUser';

import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

type DashboardOverviewProps = {
    user: User | null;
};

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user }) => {
    const [isFormVisable, setIsFormVisable] = useState(false);
    const getValue = (value: string | null | undefined, defaultValue: string = 'brak') => {
        return value ?? defaultValue;
    };
    const handleToggleForm = () => {
        setIsFormVisable(prev => !prev);
    };
    const userDetails = [
        { label: 'Login', value: user?.login },
        { label: 'Email', value: user?.email },
        { label: 'Imię', value: user?.firstname },
        { label: 'Nazwisko', value: user?.lastname },
        { label: 'Numer telefonu', value: user?.phoneNumber },
        { label: 'Adres', value: user?.address },
        { label: 'Data urodzenia', value: user?.dateOfBirth },
        { label: 'Płeć', value: user?.gender },
        { label: 'Rola', value: user?.role },
        { label: 'Saldo gotówki', value: `${user?.cash} zł` },
    ];

    return (
        <Card className="bg-card text-card-foreground dark:bg-card-dark dark:text-card-foreground-dark p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl font-semibold text-primary dark:text-primary-dark">Cześć {user?.firstname ?? user?.login}!</CardTitle>
                    <CardDescription>Witaj w Twoim panelu!</CardDescription>
                </div>
                <button
                    onClick={handleToggleForm}
                    className="bg-primary text-white p-2 rounded-md hover:bg-primary-hover dark:hover:bg-primary-foreground dark:text-secondary dark:focus:ring"
                >
                    {isFormVisable ? 'Anuluj' : 'Edytuj profil'}
                </button>
            </div>
            <CardContent className="space-y-4 ">
                {userDetails.map(({ label, value }, index) => (
                    <div key={index} className="flex justify-center ">
                        <span
                            className="font-medium text-primary
                        "
                        >
                            {label}:
                        </span>
                        <span>{getValue(value)}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default DashboardOverview;
