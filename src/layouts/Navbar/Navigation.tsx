import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationList {
    link: string;
    text: string;
}

const navigationList: NavigationList[] = [
    {
        link: '/atrakcje',
        text: 'Atrakcje',
    },
    {
        link: '/cennik',
        text: 'Cennik',
    },
    {
        link: '/kontakt',
        text: 'Kontakt',
    },
];

const Navigation: React.FC = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList className="space-x-4">
                {navigationList.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link to={item.link} className="hover:text-blue-500 transition-colors">
                            {item.text}
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
