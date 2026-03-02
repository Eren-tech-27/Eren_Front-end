import { Bell, Search, ChevronRight, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const routeLabels: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/personal-records': 'Employee Management',
    '/dashboard/attendance': 'Time & Attendance',
    '/dashboard/leave': 'Leave Management',
    '/dashboard/payroll': 'Payroll',
    '/dashboard/compliance': 'Government Compliance',
    '/dashboard/self-service': 'Employee Self-Service',
    '/dashboard/assets': 'Asset Management',
    '/dashboard/clearance': 'Clearance',
    '/dashboard/hris': 'HRIS System',
    '/dashboard/settings': 'Admin Settings',
};

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const { role, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (d: Date) => {
        return d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (d: Date) => {
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const currentPage = routeLabels[location.pathname] || 'Page';

    return (
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
            {/* Left: Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-medium">HRIS</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-800">{currentPage}</span>
            </div>

            {/* Center: Search + Active badge */}
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-56 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50 transition-all"
                    />
                </div>
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    245 Active Employees
                </div>
            </div>

            {/* Right: Clock + Notifications + Profile */}
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 leading-tight">{formatTime(time)}</p>
                    <p className="text-[11px] text-gray-400 leading-tight">{formatDate(time)}</p>
                </div>

                <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors group">
                    <Bell className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {role === 'admin' ? 'A' : 'U'}
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-xs font-semibold text-gray-800">
                            {role === 'admin' ? 'Admin User' : 'Employee User'}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            {role === 'admin' ? 'HR Administrator' : 'Employee'}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-xl hover:bg-red-50 transition-colors group"
                        title="Log Out"
                    >
                        <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
