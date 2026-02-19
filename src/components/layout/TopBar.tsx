
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

interface TopBarProps {
    onMenuClick?: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
            {/* Left: Menu Button (Mobile) + Title + Search */}
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-1/2">
                <button 
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Toggle menu"
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>
                
                <span className="text-lg md:text-2xl font-extrabold text-[var(--color-primary)] tracking-tight whitespace-nowrap">
                    HRIS
                </span>
                
                <div className="hidden md:flex relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] sm:text-sm transition-colors"
                        placeholder="Search..."
                    />
                </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3 md:gap-6">
                <button className="relative p-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
                    <Bell className="h-5 md:h-6 w-5 md:w-6" />
                    <span className="absolute top-1 right-1 block h-2 md:h-2.5 w-2 md:w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 p-1 md:p-2 rounded-lg transition-colors min-w-0">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        JD
                    </div>
                    <div className="hidden sm:block min-w-0">
                        <p className="text-xs md:text-sm font-medium text-gray-700 truncate">John Doe</p>
                        <p className="text-xs text-gray-500 truncate">Administrator</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block shrink-0" />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
