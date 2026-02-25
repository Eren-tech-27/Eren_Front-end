
import { Search, Eye, CheckCircle, XCircle, Clock, MoreVertical, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const ClearanceList = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved'>('All');

    const clearances = [
        { id: 1, name: 'Dela Cruz, Juan', position: 'Admin Officer', purpose: 'Retirement', status: 'Pending', date: '2024-09-10' },
        { id: 2, name: 'Santos, Maria', position: 'Project Manager', purpose: 'Transfer', status: 'Approved', date: '2024-09-08' },
        { id: 3, name: 'Reyes, Jose', position: 'Tech Assistant', purpose: 'Resignation', status: 'Rejected', date: '2024-09-05' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (id: number) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Approved': return <CheckCircle size={16} />;
            case 'Rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Clearance Requests</h1>
                    <p className="text-sm text-gray-500">Manage employee clearance processing.</p>
                </div>
                <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    New Request
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('All')}
                            className={`px-3 py-1 text-sm font-medium rounded-lg ${filter === 'All' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >All</button>
                        <button
                            onClick={() => setFilter('Pending')}
                            className={`px-3 py-1 text-sm font-medium rounded-lg ${filter === 'Pending' ? 'bg-yellow-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >Pending</button>
                        <button
                            onClick={() => setFilter('Approved')}
                            className={`px-3 py-1 text-sm font-medium rounded-lg ${filter === 'Approved' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >Approved</button>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#107d38] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Employee
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Purpose
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Date Filed
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clearances
                            .filter((item) => {
                                if (filter === 'All') return true;
                                if (filter === 'Pending') return item.status === 'Pending';
                                if (filter === 'Approved') return item.status === 'Approved';
                                return true;
                            })
                            .map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.purpose}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                        {getStatusIcon(item.status)}
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-2 relative">
                                        <button
                                            onClick={() => navigate('/dashboard/clearance/1')}
                                            className="text-[var(--color-primary)] hover:text-green-900"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <div className="relative">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenu === item.id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-100 py-1 text-left"
                                                >
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                        onClick={() => setActiveMenu(null)}
                                                    >
                                                        <Edit size={16} /> Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClearanceList;
