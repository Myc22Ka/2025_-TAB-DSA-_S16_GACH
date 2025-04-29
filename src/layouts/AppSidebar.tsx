import React from 'react';
import { Link } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FaTicketAlt, FaCog } from 'react-icons/fa';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';

const SidebarComponent: React.FC = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center justify-center p-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Twoja Aplikacja</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link
                            to="/moje-bilety"
                            className="flex items-center gap-2 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                            <FaTicketAlt />
                            <span>Moje bilety</span>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link
                            to="/ustawienia"
                            className="flex items-center gap-2 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                            <FaCog />
                            <span>Ustawienia</span>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <ModeToggle />
            <SidebarFooter>
                <div className="flex flex-col gap-2 p-4">
                    <Link
                        to="/login"
                        className="w-full text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 py-2 rounded-md"
                    >
                        Zaloguj się
                    </Link>
                    <Link
                        to="/signup"
                        className="w-full text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 py-2 rounded-md"
                    >
                        Zarejestruj się
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default SidebarComponent;
