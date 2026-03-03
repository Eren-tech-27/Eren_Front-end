import { useState } from 'react';
import { Calendar, Plus, X, User } from 'lucide-react';

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

const MyLeave = () => {
    const [myLeaveBalances] = useState({
        vacation: { total: 15, used: 5, remaining: 10 },
        sick: { total: 15, used: 3, remaining: 12 },
        emergency: { total: 5, used: 1, remaining: 4 },
    });

    const [myLeaveRequests, setMyLeaveRequests] = useState([
        { id: 1, leaveType: 'Vacation Leave', startDate: '2026-02-26', endDate: '2026-02-28', days: 3, status: 'Pending' as LeaveStatus, reason: 'Family trip' },
        { id: 2, leaveType: 'Sick Leave', startDate: '2026-03-05', endDate: '2026-03-05', days: 1, status: 'Pending' as LeaveStatus, reason: 'Medical Checkup' },
    ]);

    const [myLeaveHistory] = useState([
        { id: 1, dateApplied: '2026-02-15', leaveType: 'Vacation Leave', duration: '3 days', status: 'Approved' as LeaveStatus, approver: 'HR Admin' },
        { id: 2, dateApplied: '2026-01-10', leaveType: 'Sick Leave', duration: '2 days', status: 'Approved' as LeaveStatus, approver: 'Direct Manager' },
    ]);

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applyForm, setApplyForm] = useState({ leaveType: 'Vacation Leave', startDate: '', endDate: '', reason: '' });

    const statusBadge: Record<string, string> = {
        Pending: 'badge-warning',
        Approved: 'badge-success',
        Rejected: 'badge-danger',
    };

    const handleApplyLeave = () => {
        if (!applyForm.startDate || !applyForm.endDate) {
            alert("Please select start and end dates.");
            return;
        }
        
        const diffTime = Math.abs(new Date(applyForm.endDate).getTime() - new Date(applyForm.startDate).getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

        const newRequest = {
            id: Date.now(),
            leaveType: applyForm.leaveType,
            startDate: applyForm.startDate,
            endDate: applyForm.endDate,
            days: days > 0 ? days : 0,
            status: 'Pending' as LeaveStatus,
            reason: applyForm.reason
        };

        setMyLeaveRequests([newRequest, ...myLeaveRequests]);
        setShowApplyModal(false);
        setApplyForm({ leaveType: 'Vacation Leave', startDate: '', endDate: '', reason: '' });
    };

    return (
        <div className="space-y-6">
            <div className="page-header animate-fade-in-up">
                <h1>My Leave</h1>
                <p>Manage your leave balances, view history, and submit new requests</p>
            </div>

            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Balances Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-gray-800">My Leave Balances</h3>
                        <button onClick={() => setShowApplyModal(true)} className="btn btn-primary">
                            <Plus className="w-4 h-4" /> Apply for Leave
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Vacation Leave', ...myLeaveBalances.vacation, gradient: 'linear-gradient(135deg, #059669, #10b981)' },
                            { label: 'Sick Leave', ...myLeaveBalances.sick, gradient: 'linear-gradient(135deg, #d97706, #f59e0b)' },
                            { label: 'Emergency Leave', ...myLeaveBalances.emergency, gradient: 'linear-gradient(135deg, #dc2626, #ef4444)' },
                        ].map(l => (
                            <div key={l.label} className="rounded-xl p-5 border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: l.gradient }}>
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs text-gray-500 font-semibold">{l.label}</p>
                                </div>
                                <div className="flex items-end gap-2 mb-2">
                                    <p className="text-2xl font-bold text-gray-800">{l.remaining}</p>
                                    <p className="text-xs text-gray-400 mb-1">/ {l.total} remaining</p>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="h-2 rounded-full transition-all" style={{ width: `${(l.remaining / l.total) * 100}%`, background: l.gradient }} />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1.5">{l.used} used</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Requests Section */}
                <div className="pro-card p-6">
                    <h3 className="text-base font-bold text-gray-800 mb-4">Pending Requests</h3>
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="pro-table w-full">
                            <thead>
                                <tr>
                                    {['Leave Type', 'Start Date', 'End Date', 'Days', 'Reason', 'Status'].map(h => <th key={h}>{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {myLeaveRequests.length > 0 ? myLeaveRequests.map((r) => (
                                    <tr key={r.id}>
                                        <td className="!font-medium">{r.leaveType}</td>
                                        <td>{r.startDate}</td>
                                        <td>{r.endDate}</td>
                                        <td className="font-semibold">{r.days}</td>
                                        <td className="text-gray-500 text-xs max-w-[150px] truncate" title={r.reason}>{r.reason || '-'}</td>
                                        <td><span className={`badge ${statusBadge[r.status]}`}><span className="badge-dot" />{r.status}</span></td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={6} className="text-center py-6 text-gray-400 italic">No pending requests.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Application Modal (Employee Only) */}
            {showApplyModal && (
                <div className="pro-modal-overlay">
                    <div className="pro-modal max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="pro-modal-header">
                            <h3>Apply for Leave</h3>
                            <button onClick={() => setShowApplyModal(false)} className="btn-ghost btn-icon"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="pro-modal-body space-y-4">
                            <div className="bg-emerald-50 text-emerald-800 text-sm px-4 py-3 rounded-lg flex items-center gap-2 border border-emerald-100">
                                <User className="w-4 h-4" />
                                Applying as: <strong>Juan Dela Cruz</strong>
                            </div>

                            <div>
                                <label className="pro-label">Leave Type</label>
                                <select className="pro-select" value={applyForm.leaveType} onChange={(e) => setApplyForm({...applyForm, leaveType: e.target.value})}>
                                    <option>Vacation Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Emergency Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="pro-label">Start Date</label>
                                    <input type="date" className="pro-input" value={applyForm.startDate} onChange={(e) => setApplyForm({...applyForm, startDate: e.target.value})} />
                                </div>
                                <div>
                                    <label className="pro-label">End Date</label>
                                    <input type="date" className="pro-input" value={applyForm.endDate} onChange={(e) => setApplyForm({...applyForm, endDate: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label className="pro-label">Reason</label>
                                <textarea rows={3} className="pro-input resize-none" placeholder="Brief reason for leave..." value={applyForm.reason} onChange={(e) => setApplyForm({...applyForm, reason: e.target.value})} />
                            </div>
                        </div>
                        <div className="pro-modal-footer">
                            <button onClick={() => setShowApplyModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleApplyLeave} className="btn btn-primary">Submit Application</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyLeave;