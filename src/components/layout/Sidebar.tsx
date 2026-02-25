import { Home, Users, Calendar, ClipboardCheck, MapPin, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Personal Records', path: '/dashboard/personal-records' },
        { icon: Calendar, label: 'Attendance & Leave', path: '/dashboard/attendance' },
        { icon: ClipboardCheck, label: 'Clearance', path: '/dashboard/clearance' },
        { icon: MapPin, label: 'Regional Offices', path: '/dashboard/regions' },
        { icon: Settings, label: 'Admin Settings', path: '/dashboard/settings' },
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="w-[280px] h-screen flex flex-col fixed left-0 top-0 z-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
            {/* Logo Section */}
            <div className="px-6 py-7 flex flex-col items-center justify-center border-b border-white/10">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-xl group-hover:bg-green-500/30 transition-all duration-500"></div>
                        <img src={logo} alt="SimpleVia Logo" className="w-10 h-10 relative drop-shadow-lg" />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white tracking-tight">SimpleVia</div>
                        <div className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase">Technologies Inc.</div>
                    </div>
                </div>
            </div>

            {/* Navigation - Removed unused 'index' parameter below */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                            ${isActive
                                ? 'bg-white/10 text-white shadow-lg shadow-green-500/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {/* Active indicator bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-400 rounded-r-full shadow-lg shadow-green-400/50"></div>
                                )}
                                <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-green-500/20' : 'group-hover:bg-white/10'}`}>
                                    <item.icon size={18} className={isActive ? 'text-green-400' : ''} />
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
                >
                    <div className="p-1.5 rounded-lg group-hover:bg-red-500/20 transition-all duration-200">
                        <LogOut size={18} />
                    </div>
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;