import React, { useEffect } from 'react';
import Footer from './Footer';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthProvider';
import Navbar from './Navbar/Navbar';

interface IDefaultLayout {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
    const { user } = useAuth();

    useEffect(() => {
        console.log('user', user);
    }, [user]);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-screen bg-gray-100 dark:bg-gray-900">
                {/* <AppSidebar /> */}
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
