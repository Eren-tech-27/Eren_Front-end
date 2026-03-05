import { Bell, Search, ChevronRight, Check, Trash2, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLeave } from '../../context/LeaveContext';

const routeLabels: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/personal-records': 'Employee Management',
    '/dashboard/attendance': 'Time & Attendance',
    '/dashboard/leave': 'Leave Management',
    '/dashboard/payroll': 'Payroll',
    '/dashboard/compliance': 'Government Compliance',
    '/dashboard/settings': 'Admin Settings',
    // ... add other labels as needed
};

interface TopBarProps {
    onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
    const [time, setTime] = useState(new Date());
    const location = useLocation();
    const { role } = useAuth();
    const { notifications: leaveNotifications, markNotificationRead, clearNotifications } = useLeave();
    const [showNotifications, setShowNotifications] = useState(false);
    const [systemNotifications, setSystemNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const currentPage = routeLabels[location.pathname] || 'Page';

    return (
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            <div className="flex items-center gap-3">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap">
                    <span className="text-gray-400 font-medium hidden xs:block">HRIS</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden xs:block" />
                    <span className="font-semibold text-gray-800 truncate">{currentPage}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-40 lg:w-56 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-emerald-400 transition-all"
                    />
                </div>

                <div className="text-right hidden sm:block">
                    <p className="text-xs lg:text-sm font-bold text-gray-800 leading-tight">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-tight">
                        {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                </div>

                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 relative"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-gray-200">
                    <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xs lg:text-sm font-bold">
                        {role === 'admin' ? 'A' : 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;