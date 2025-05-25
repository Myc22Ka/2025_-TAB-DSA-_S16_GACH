import React from 'react';
import Footer from './Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar/Navbar';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-screen bg-white dark:bg-gray-900 dark:border-gray-700">
                <div className="flex flex-col flex-1">
                    <Navbar />
                    <main className="flex-grow w-full">{children}</main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
};

export default DefaultLayout;
