import { useState } from 'react';
import { ArrowLeft, CheckSquare, MessageSquare, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChecklistModal from '../../components/modals/ChecklistModal';

const ClearanceForm = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Clearance Details</h1>
                    <p className="text-sm text-gray-500">Processing clearance for Juan Dela Cruz</p>
                </div>
                <div className="ml-auto flex gap-3">
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium">
                        Decline
                    </button>
                    <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                        <Save size={18} /> Approve
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Clearance Checklist</h3>
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requirement</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Return of Office Equipment (Laptop, Phone)</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Cleared
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[var(--color-primary)] font-medium text-sm hover:underline">Edit</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Settlement of Financial Obligations</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-[var(--color-primary)] font-medium text-sm hover:underline"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Submission of Turn-over Reports</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                N/A
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[var(--color-primary)] font-medium text-sm hover:underline">Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-primary)]">
                            <CheckSquare size={16} /> Add Custom Requirement
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Request Info</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">Employee</p>
                                <p className="font-medium text-gray-900">Juan Dela Cruz</p>
                            </div>
                            <div>
                                <p className="text-gray-500">ID Number</p>
                                <p className="font-medium text-gray-900">2024001</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date Filed</p>
                                <p className="font-medium text-gray-900">Sep 10, 2024</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Effective Date</p>
                                <p className="font-medium text-gray-900">Oct 01, 2024</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Purpose</p>
                                <p className="font-medium text-gray-900">Retirement</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Comments</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0"></div>
                                <div className="bg-gray-50 p-3 rounded-lg text-sm w-full">
                                    <p className="font-bold text-gray-900 text-xs">Admin (You)</p>
                                    <p className="text-gray-600">Please remind the employee to return the gate pass key.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 relative">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            />
                            <button className="absolute right-2 top-2 text-[var(--color-primary)]">
                                <MessageSquare size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ChecklistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ClearanceForm;
