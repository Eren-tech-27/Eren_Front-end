
import React, { useEffect, useRef, useState } from 'react';
import './topbar.css';
import { Search, Bell, ChevronDown } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileMenu from './ProfileMenu';

type NotificationItem = {
    id: string;
    title: string;
    description?: string;
    time?: string;
    read?: boolean;
};

const TopBar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [notifications, setNotifications] = useState<NotificationItem[]>([
        { id: '1', title: 'New employee added', description: 'Jane Smith was added to HR.', time: '2m', read: false },
        { id: '2', title: 'Payroll processed', description: 'February payroll has been processed.', time: '1h', read: false },
        { id: '3', title: 'Policy update', description: 'Leave policy updated.', time: '1d', read: true },
    ]);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
                setShowProfile(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-10 border-b border-white/20 topbar-backdrop">
            {/* Left: Title + Search */}
            <div className="flex items-center gap-5 flex-1">
                <h1 className="text-2xl font-extrabold tracking-tight whitespace-nowrap logo-gradient">
                    HRIS SYSTEM
                </h1>
                <div className="relative w-full max-w-sm group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-green-500 transition-colors duration-200" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50/80 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 focus:bg-white transition-all duration-300 focus:w-full focus:shadow-lg focus:shadow-green-500/5"
                        placeholder="Search anything..."
                    />
                </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-4 relative" ref={containerRef}>
                {/* Notification Bell */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotifications((s) => !s);
                            setShowProfile(false);
                        }}
                        aria-label="Notifications"
                        className="relative p-2.5 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2">
                            <NotificationDropdown
                                notifications={notifications}
                                onMarkRead={markAsRead}
                                onMarkAllRead={markAllAsRead}
                                onRemove={removeNotification}
                            />
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-slate-200"></div>

                {/* User Profile */}
                <div>
                    <div
                        onClick={() => {
                            setShowProfile((s) => !s);
                            setShowNotifications(false);
                        }}
                        className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 pr-3 rounded-xl transition-all duration-200"
                    >
                        <div className="relative">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-green-500/20">
                                JD
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-slate-700 leading-tight">John Doe</p>
                            <p className="text-xs text-slate-400 font-medium">Administrator</p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>

                    {showProfile && (
                        <div className="absolute right-0 mt-2">
                            <ProfileMenu
                                userName="John Doe"
                                role="Administrator"
                                onLogout={() => console.log('logout')}
                                onViewProfile={() => console.log('view profile')}
                                onSettings={() => console.log('settings')}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
