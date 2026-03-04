import { useState } from 'react';
import { User, FileText, Calendar, Clock, Download, Eye, ChevronRight, CheckCircle2, Clock4, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added for navigation

const EmployeeSelfService = () => {
    // --- Mock Data ---
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

    const [recentPayslips] = useState([
        { id: 1, period: 'Feb 1-15, 2026', netPay: '₱28,500', date: 'Feb 15, 2026' },
        { id: 2, period: 'Jan 16-31, 2026', netPay: '₱28,500', date: 'Jan 31, 2026' },
    ]);

    const [recentAttendance] = useState([
        { id: 1, date: 'Feb 18, 2026', timeIn: '07:55 AM', timeOut: '05:05 PM', status: 'On Time' },
        { id: 2, date: 'Feb 17, 2026', timeIn: '08:10 AM', timeOut: '05:00 PM', status: 'Late' },
        { id: 3, date: 'Feb 16, 2026', timeIn: '07:50 AM', timeOut: '05:15 PM', status: 'On Time' },
    ]);

    const [recentLeave] = useState([
        { id: 1, type: 'Sick Leave', dates: 'Feb 12 - Feb 13, 2026', status: 'Approved' },
        { id: 2, type: 'Vacation Leave', dates: 'Mar 01 - Mar 05, 2026', status: 'Pending' },
    ]);

    // Helpers
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Time': return 'text-emerald-600 bg-emerald-50';
            case 'Late': return 'text-rose-600 bg-rose-50';
            case 'Approved': return 'text-emerald-600 bg-emerald-50';
            case 'Pending': return 'text-amber-600 bg-amber-50';
            case 'Rejected': return 'text-rose-600 bg-rose-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Approved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case 'Pending': return <Clock4 className="w-4 h-4 text-amber-500" />;
            case 'Rejected': return <XCircle className="w-4 h-4 text-rose-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="page-header animate-fade-in-up">
                <h1>Employee Dashboard</h1>
                <p>Welcome back! Here is a quick overview of your work details.</p>
            </div>

            {/* Employee Banner Card */}
            <div className="rounded-2xl overflow-hidden animate-fade-in-up shadow-lg" style={{ background: 'linear-gradient(135deg, #059669, #10b981, #34d399)', animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                <div className="p-6 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30 shadow-inner">
                        {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h2>
                        <p className="text-emerald-50 font-medium mt-0.5">{profile.position} • {profile.department}</p>
                        <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />{profile.status} Employee
                        </span>
                    </div>
                </div>
            </div>

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* WIDGET 1: Profile Summary */}
                <div className="pro-card animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                    <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <User className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-gray-800">Profile Details</h3>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Employee ID</p>
                            <p className="text-sm font-medium text-gray-800 mt-0.5">{profile.id}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Hire Date</p>
                            <p className="text-sm font-medium text-gray-800 mt-0.5">{profile.hireDate}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Email</p>
                            <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{profile.email}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Phone</p>
                            <p className="text-sm font-medium text-gray-800 mt-0.5">{profile.phone}</p>
                        </div>
                    </div>
                </div>

                {/* WIDGET 2: Recent Attendance */}
                <div className="pro-card animate-fade-in-up flex flex-col" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-800">Recent Attendance</h3>
                        </div>
                        <Link to="/dashboard/my-attendance" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                            View Log <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1 flex flex-col">
                        {recentAttendance.map((record, index) => (
                            <div key={record.id} className={`px-5 py-3.5 flex items-center justify-between ${index !== recentAttendance.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors`}>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{record.date}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{record.timeIn} - {record.timeOut}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${getStatusColor(record.status)}`}>
                                    {record.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WIDGET 3: Recent Leave Requests */}
                <div className="pro-card animate-fade-in-up flex flex-col" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-800">Leave History</h3>
                        </div>
                        <Link to="/dashboard/my-leave" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                            Manage Leave <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="p-0 flex-1 flex flex-col">
                        {recentLeave.map((leave, index) => (
                            <div key={leave.id} className={`px-5 py-3.5 flex items-center justify-between ${index !== recentLeave.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors`}>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{leave.type}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{leave.dates}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {getStatusIcon(leave.status)}
                                    <span className="text-xs font-semibold text-gray-700">{leave.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WIDGET 4: Recent Payslips */}
                <div className="pro-card animate-fade-in-up flex flex-col" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <FileText className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-800">Recent Payslips</h3>
                        </div>
                    </div>
                    <div className="p-0 flex-1 flex flex-col">
                        {recentPayslips.map((payslip, index) => (
                            <div key={payslip.id} className={`px-5 py-3.5 flex items-center justify-between ${index !== recentPayslips.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors`}>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{payslip.period}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Paid: {payslip.date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-emerald-600 mr-2">{payslip.netPay}</p>
                                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                                    <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeSelfService;