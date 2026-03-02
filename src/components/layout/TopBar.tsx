import { Bell, Search, ChevronRight, LogOut, Check, Info, AlertCircle, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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

// Mock Notification Data
const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        title: 'Leave Request',
        message: 'John Doe submitted a sick leave request.',
        time: '5m ago',
        type: 'info',
        isRead: false
    },
    {
        id: 2,
        title: 'Payroll Processed',
        message: 'Monthly payroll for March has been generated.',
        time: '2h ago',
        type: 'success',
        isRead: false
    },
    {
        id: 3,
        title: 'System Alert',
        message: 'Server maintenance scheduled for 12:00 AM.',
        time: '5h ago',
        type: 'warning',
        isRead: true
    }
];

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const notificationRef = useRef<HTMLDivElement>(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { role, logout } = useAuth();

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const formatTime = (d: Date) => {
        return d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (d: Date) => {
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <Check className="w-4 h-4 text-emerald-500" />;
            case 'warning': return <AlertCircle className="w-4 h-4 text-amber-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const currentPage = routeLabels[location.pathname] || 'Page';

    return (
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
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

                {/* Notifications Dropdown Container */}
                <div className="relative" ref={notificationRef}>
                    <button 
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className={`relative p-2 rounded-xl transition-colors group ${isNotificationOpen ? 'bg-emerald-50' : 'hover:bg-gray-100'}`}
                    >
                        <Bell className={`h-5 w-5 transition-colors ${isNotificationOpen ? 'text-emerald-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800">Notifications</h3>
                                <button 
                                    onClick={markAllAsRead}
                                    className="text-xs text-emerald-600 font-semibold hover:text-emerald-700"
                                >
                                    Mark all as read
                                </button>
                            </div>
                            
                            <div className="max-h-[350px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div 
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={`p-4 border-b border-gray-50 cursor-pointer transition-colors flex gap-3 ${notification.isRead ? 'opacity-60' : 'bg-emerald-50/30 hover:bg-emerald-50/50'}`}
                                        >
                                            <div className="mt-1">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className={`text-xs font-bold ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                                                        {notification.title}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                        <Clock className="w-3 h-3" />
                                                        {notification.time}
                                                    </div>
                                                </div>
                                                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            {!notification.isRead && (
                                                <div className="mt-2 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                        <p className="text-sm text-gray-400 font-medium">No notifications yet</p>
                                    </div>
                                )}
                            </div>
                            
                            <button className="w-full p-3 text-center text-xs font-semibold text-gray-500 hover:bg-gray-50 border-t border-gray-50 transition-colors">
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>

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