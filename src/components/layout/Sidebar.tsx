import { useState } from 'react';
import {
    Home, Users, Clock, FileText, DollarSign, Shield, UserCircle,
    Package, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { role } = useAuth();

    const mainNav = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
    ];

    // Admin sees all HR management pages
    const hrNav = [
        { icon: Users, label: 'Employee Mgmt', path: '/dashboard/personal-records' },
        { icon: Clock, label: 'Time & Attendance', path: '/dashboard/attendance' },
        { icon: FileText, label: 'Leave Management', path: '/dashboard/leave' },
        { icon: DollarSign, label: 'Payroll', path: '/dashboard/payroll' },
        { icon: Shield, label: 'Gov. Compliance', path: '/dashboard/compliance' },
    ];

    // User only sees Self-Service and Leave
    const userNav = [
        { icon: UserCircle, label: 'Self-Service', path: '/dashboard/self-service' },
        { icon: FileText, label: 'Leave Management', path: '/dashboard/leave' },
    ];

    const moduleNav = [
        { icon: UserCircle, label: 'Self-Service', path: '/dashboard/self-service' },
        { icon: Package, label: 'Asset Mgmt', path: '/dashboard/assets' },
    ];

    const systemNav = [
        { icon: Settings, label: 'Admin Settings', path: '/dashboard/settings' },
    ];

    const NavSection = ({ title, items }: { title: string; items: typeof mainNav }) => (
        <div className="mb-2">
            {!collapsed && (
                <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/50">
                    {title}
                </p>
            )}
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                        `group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${isActive
                            ? 'bg-white/15 text-white shadow-lg shadow-black/10'
                            : 'text-emerald-100/70 hover:bg-white/8 hover:text-white'
                        } ${collapsed ? 'justify-center px-0' : ''}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                            )}
                            <item.icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-emerald-200/60 group-hover:text-emerald-300'
                                }`} />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );

    return (
        <div
            className={`h-screen flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'
                }`}
            style={{ background: 'linear-gradient(180deg, #064e3b 0%, #065f46 40%, #047857 100%)' }}
        >
            {/* Logo Section */}
            <div className={`px-4 pt-5 pb-4 border-b border-white/10 ${collapsed ? 'px-3' : ''}`}>
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex-shrink-0">
                        <img src={logo} alt="SimpleVia Logo" className="w-full h-full" />
                    </div>
                    {!collapsed && (
                        <div className="animate-fade-in">
                            <p className="text-white text-sm font-bold leading-tight tracking-wide">SimpleVia</p>
                            <p className="text-emerald-300/60 text-[10px] leading-tight">HRIS Platform</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation - Role-based */}
            <nav className="flex-1 py-4 overflow-y-auto space-y-1">
                <NavSection title="Main" items={mainNav} />
                {role === 'admin' ? (
                    <>
                        <NavSection title="Human Resources" items={hrNav} />
                        <NavSection title="Modules" items={moduleNav} />
                        <NavSection title="System" items={systemNav} />
                    </>
                ) : (
                    <NavSection title="My Pages" items={userNav} />
                )}
            </nav>

            {/* User Section & Collapse */}
            <div className="border-t border-white/10 p-3 space-y-2">
                {!collapsed && (
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-emerald-400/30">
                            {role === 'admin' ? 'A' : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-semibold truncate">
                                {role === 'admin' ? 'Admin User' : 'Employee User'}
                            </p>
                            <p className="text-emerald-300/50 text-[10px] truncate">
                                {role === 'admin' ? 'HR Administrator' : 'Employee'}
                            </p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-emerald-200/60 hover:bg-white/8 hover:text-white transition-all text-xs font-medium"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : (
                        <>
                            <ChevronLeft className="w-4 h-4" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
