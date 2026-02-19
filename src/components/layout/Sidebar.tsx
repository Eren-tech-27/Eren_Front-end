
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
        // Add any logout logic here (e.g., clearing tokens)
        navigate('/login');
    };

    return (
        <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 shadow-sm fixed left-0 top-0">
            <div className="p-6 flex flex-col items-center justify-center border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="SimpleVia Logo" className="w-8 h-8" />
                    <div className="text-xl font-bold text-[var(--color-primary)]">SimpleVia</div>
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wide">Technologies Inc.</div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/dashboard'} // Only exact match for dashboard home
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-[var(--color-primary)] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)]'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
