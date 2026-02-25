import { X, Check } from 'lucide-react';

type Notification = {
    id: string;
    title: string;
    description?: string;
    time?: string;
    read?: boolean;
};

type Props = {
    notifications: Notification[];
    onMarkRead: (id: string) => void;
    onMarkAllRead: () => void;
    onRemove: (id: string) => void;
};

const NotificationDropdown = ({ notifications, onMarkRead, onMarkAllRead, onRemove }: Props) => {
    return (
        <div className="w-96 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="text-sm font-semibold text-slate-700">Notifications</h3>
                <button
                    onClick={onMarkAllRead}
                    className="text-xs text-green-600 hover:underline flex items-center gap-1"
                >
                    <Check className="h-4 w-4" />
                    Mark all
                </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 && (
                    <div className="p-4 text-sm text-slate-500">No notifications</div>
                )}

                {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 flex items-start gap-3 ${n.read ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="flex-shrink-0">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${n.read ? 'bg-slate-200 text-slate-700' : 'bg-green-500 text-white'}`}>
                                {n.title.charAt(0)}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{n.title}</p>
                                    {n.description && <p className="text-xs text-slate-400">{n.description}</p>}
                                </div>
                                <div className="text-xs text-slate-400">{n.time}</div>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                {!n.read && (
                                    <button
                                        onClick={() => onMarkRead(n.id)}
                                        className="text-xs text-slate-600 hover:text-green-600"
                                    >
                                        Mark read
                                    </button>
                                )}
                                <button
                                    onClick={() => onRemove(n.id)}
                                    aria-label="Remove notification"
                                    title="Remove notification"
                                    className="ml-auto text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationDropdown;
