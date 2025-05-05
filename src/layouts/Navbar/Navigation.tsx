import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { motion } from 'framer-motion';
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
            <NavigationMenuList className="flex gap-10">
                {navigationList.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                            <Link to={item.link} className="text-2xl hover:text-primary-hover transition-colors">
                                {item.text}
                            </Link>
                        </motion.div>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
