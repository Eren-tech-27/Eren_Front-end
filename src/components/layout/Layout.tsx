
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = () => {
    return (
        <div className="flex h-screen" style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 50%, #f0f2f5 100%)' }}>
            <Sidebar />
            <div className="flex-1 ml-[280px] flex flex-col h-screen overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6" style={{ background: 'linear-gradient(180deg, rgba(240,242,245,0.5) 0%, rgba(240,242,245,1) 100%)' }}>
                    <div className="container mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
