import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar.tsx';
import AppSidebar from './AppSidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-screen bg-gray-100 dark:bg-gray-900">
                <AppSidebar />
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
