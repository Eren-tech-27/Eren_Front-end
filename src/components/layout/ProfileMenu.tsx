import { User, Settings, } from 'lucide-react';

type Props = {
    userName: string;
    role?: string;
    onLogout: () => void;
    onViewProfile: () => void;
    onSettings: () => void;
};

const ProfileMenu = ({ userName, role, onViewProfile, onSettings }: Props) => {
    return (
        <div className="w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold text-slate-700">{userName}</p>
                {role && <p className="text-xs text-slate-400">{role}</p>}
            </div>
            <div className="p-2">
                <button onClick={onViewProfile} className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700">
                    <User className="h-4 w-4 text-slate-400" /> View Profile
                </button>
                <button onClick={onSettings} className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700">
                    <Settings className="h-4 w-4 text-slate-400" /> Settings
                </button>
            </div>
        </div>
    );
};

export default ProfileMenu;