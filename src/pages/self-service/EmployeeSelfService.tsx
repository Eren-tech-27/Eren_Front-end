import { useState } from 'react';
import { User, FileText, Calendar, Bell, Download, Eye, Clock } from 'lucide-react';

// Import our new extracted components
import MyAttendance from './MyAttendance';
import MyLeave from './MyLeave';

type Tab = 'profile' | 'payslips' | 'leave' | 'attendance' | 'requests';

const EmployeeSelfService = () => {
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    const tabs = [
        { id: 'profile' as Tab, label: 'My Profile', icon: User },
        { id: 'payslips' as Tab, label: 'My Payslips', icon: FileText },
        { id: 'leave' as Tab, label: 'My Leave', icon: Calendar },
        { id: 'attendance' as Tab, label: 'My Attendance', icon: Clock },
        { id: 'requests' as Tab, label: 'My Requests', icon: Bell },
    ];

    const [profile] = useState({
        name: 'Juan Dela Cruz',
        id: 'EMP-001',
        position: 'Admin Officer',
        department: 'Administration',
        email: 'juan.delacruz@simplevia.com',
        phone: '+63 912 345 6789',
        hireDate: 'January 15, 2024',
        status: 'Active',
    });

    const [payslips] = useState([
        { id: 1, period: 'Feb 1-15, 2026', netPay: '₱28,500', date: 'Feb 15, 2026' },
        { id: 2, period: 'Jan 16-31, 2026', netPay: '₱28,500', date: 'Jan 31, 2026' },
        { id: 3, period: 'Jan 1-15, 2026', netPay: '₱27,800', date: 'Jan 15, 2026' },
    ]);

    const [myRequests] = useState([
        { id: 1, type: 'Overtime Request', date: '2026-02-18', details: '2 hours - Project deadline', status: 'Approved' },
        { id: 2, type: 'Certificate Request', date: '2026-02-15', details: 'Certificate of Employment', status: 'Completed' },
    ]);

    const statusBadge: Record<string, string> = {
        Pending: 'badge-warning',
        Approved: 'badge-success',
        Completed: 'badge-info',
    };

    return (
        <div className="space-y-6">
            <div className="page-header animate-fade-in-up">
                <h1>Employee Self-Service</h1>
                <p>View your personal information, payslips, and submit requests</p>
            </div>

            {/* Employee Banner Card */}
            <div className="rounded-2xl overflow-hidden animate-fade-in-up" style={{ background: 'linear-gradient(135deg, #059669, #10b981, #34d399)', animationDelay: '0.1s', opacity: 0 }}>
                <div className="p-6 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                        {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                        <p className="text-emerald-100 text-sm">{profile.position} • {profile.department}</p>
                        <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />{profile.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs Card */}
            <div className="pro-card animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                <div className="px-6 pt-4">
                    <div className="pro-tabs" style={{ overflowX: 'auto' }}>
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`pro-tab flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}>
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="p-6">
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {Object.entries(profile).map(([key, value]) => (
                                <div key={key} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <p className="text-sm font-semibold text-gray-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PAYSLIPS TAB */}
                    {activeTab === 'payslips' && (
                        <div className="space-y-3">
                            {payslips.map(p => (
                                <div key={p.id} className="pro-card !shadow-none border border-gray-100 !p-4 flex items-center justify-between hover:border-emerald-200 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{p.period}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Paid: {p.date}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-bold text-emerald-600">{p.netPay}</p>
                                        <button className="btn-ghost btn-icon text-blue-500 hover:bg-blue-50" title="View"><Eye className="w-4 h-4" /></button>
                                        <button className="btn-ghost btn-icon text-gray-400 hover:bg-gray-100" title="Download"><Download className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* MY LEAVE TAB - Extracted to its own file! */}
                    {activeTab === 'leave' && <MyLeave />}

                    {/* ATTENDANCE TAB - Extracted to its own file! */}
                    {activeTab === 'attendance' && <MyAttendance />}

                    {/* OTHER REQUESTS TAB */}
                    {activeTab === 'requests' && (
                        <div className="space-y-3">
                            {myRequests.map((r) => (
                                <div key={r.id} className="pro-card !shadow-none border border-gray-100 !p-4 flex items-center justify-between hover:border-emerald-200 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{r.type}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{r.date} • {r.details}</p>
                                    </div>
                                    <span className={`badge ${statusBadge[r.status]}`}><span className="badge-dot" />{r.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeSelfService;