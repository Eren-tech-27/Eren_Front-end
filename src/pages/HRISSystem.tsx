import { FC } from 'react';
import { Users, FileText, ClipboardList, PieChart } from 'lucide-react';

const HRISSystem: FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">HRIS System</h1>
                    <p className="text-sm text-gray-500">Centralized HR dashboard and navigation.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-full bg-green-50 text-green-600"><Users /></div>
                    <h3 className="text-lg font-semibold">Personal Records</h3>
                    <p className="text-sm text-gray-500">Employee profiles and personal data.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600"><FileText /></div>
                    <h3 className="text-lg font-semibold">Attendance & Leave</h3>
                    <p className="text-sm text-gray-500">Track time and leave requests.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-full bg-yellow-50 text-yellow-600"><ClipboardList /></div>
                    <h3 className="text-lg font-semibold">Clearance</h3>
                    <p className="text-sm text-gray-500">Manage clearance requests and approvals.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-full bg-indigo-50 text-indigo-600"><PieChart /></div>
                    <h3 className="text-lg font-semibold">Analytics & Reports</h3>
                    <p className="text-sm text-gray-500">View charts and exportable reports.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Design Notes</h3>
                <ul className="list-disc pl-6 text-sm text-gray-600 space-y-2">
                    <li>Mobile-first responsive layout using Tailwind utilities.</li>
                    <li>Top-level modules: Personal Records, Attendance, Clearance, Analytics.</li>
                    <li>Consistent card components for quick access and KPIs.</li>
                    <li>Use modals for drill-down charts and item details to keep context.</li>
                    <li>Accessibility: ensure color contrast and keyboard focus states.</li>
                </ul>
            </div>
        </div>
    );
};

export default HRISSystem;
