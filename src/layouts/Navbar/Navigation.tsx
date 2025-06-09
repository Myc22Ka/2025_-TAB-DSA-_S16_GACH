import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { useAuth } from '@/context/AuthProvider';
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationList {
    link: string;
    text: string;
}

const navigationList: NavigationList[] = [
    {
        link: '/attractions',
        text: 'Attractions',
    },
    {
        link: '/prices',
        text: 'Prices',
    },
    {
        link: '/contact',
        text: 'Contact',
    },
];

const Navigation: React.FC = () => {
    const { user } = useAuth();
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
                {navigationList.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link to={item.link} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                            {item.text}
                        </Link>
                    </NavigationMenuItem>
                ))}
                {user && (
                    <NavigationMenuItem>
                        <Link to="/instructors" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                            Instructors
                        </Link>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
