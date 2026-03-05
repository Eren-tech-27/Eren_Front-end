import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
            {/* Sidebar with mobile state */}
            <Sidebar 
                isMobileOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />
            
            {/* Main Content Area */}
            {/* On desktop (lg), we add padding-left to account for the fixed sidebar */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden lg:pl-[260px] transition-all duration-300">
                <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
                    <div className="container mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;